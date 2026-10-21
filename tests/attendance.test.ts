import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateRegistration, guestsCsv } from '../src/lib/attendance.ts';
import { GuestStore } from '../src/lib/server/guest-store.ts';
import { readJson, sameOrigin, clientRateKey } from '../src/lib/server/request-guards.ts';
const registration = () => ({ firstName: 'Test', lastName: 'Guest', dietary: '', dietaryConsent: false, requestId: randomUUID() });
test('names are required, bounded and preserve international names', () => {
  assert.equal(validateRegistration({...registration(),firstName:'  Zoë  '}).firstName,'Zoë');
  for (const firstName of ['', ' ', 'a'.repeat(81), 'A\u0000B']) assert.throws(()=>validateRegistration({...registration(),firstName}));
});
test('dietary information is optional and requires explicit permission when present', () => {
  assert.equal(validateRegistration(registration()).dietary,'');
  assert.throws(()=>validateRegistration({...registration(),dietary:'Vegetarian'}));
  assert.equal(validateRegistration({...registration(),dietary:'Vegetarian',dietaryConsent:true}).dietary,'Vegetarian');
  assert.throws(()=>validateRegistration({...registration(),dietary:'a'.repeat(501),dietaryConsent:true}));
});
test('retrying a submission does not duplicate it or overwrite its dietary information', () => {
  const store = new GuestStore(':memory:');
  try { const input=registration();assert.equal(store.add(input).inserted,true);assert.equal(store.add(input).conflict,false);assert.equal(store.add({...input,dietary:'Different',dietaryConsent:true}).conflict,true);assert.equal(store.list().length,1);assert.equal(store.list()[0].dietary,''); }
  finally { store.close(); }
});
test('guest data survives reopening storage and stale updates are rejected', () => {
  const path=join(mkdtempSync(join(tmpdir(),'ccgs-guests-test-')),'guests.sqlite');
  const first=new GuestStore(path);first.add(registration());first.close();
  const second=new GuestStore(path);
  try { const guest=second.list()[0];assert.equal(second.update(guest.id,'cancelled',guest.version),true);assert.equal(second.update(guest.id,'confirmed',guest.version),false);assert.equal(second.list()[0].status,'cancelled');assert.equal(second.update(guest.id,'confirmed',guest.version+1),true); }
  finally {second.close();}
});
test('rate limits reset after their window and session expiry can be revoked', () => {
  const store=new GuestStore(':memory:');
  try {assert.equal(store.allow('login',2,1000,0),true);assert.equal(store.allow('login',2,1000,1),true);assert.equal(store.allow('login',2,1000,2),false);assert.equal(store.allow('login',2,1000,1001),true);store.saveSession('hashed-token',1234);assert.equal(store.sessionExpiry('hashed-token'),1234);store.revokeSession('hashed-token');assert.equal(store.sessionExpiry('hashed-token'),0);assert.equal(store.sessionExpiry('unknown'),undefined);}
  finally {store.close();}
});
test('CSV escapes formula prefixes, quotes and commas', () => {
  const store=new GuestStore(':memory:');try {store.add({...registration(),firstName:'=1+1',dietary:'No "nuts", please',dietaryConsent:true});const csv=guestsCsv(store.list());assert.ok(csv.includes('"\'=1+1"'));assert.ok(csv.includes('"No ""nuts"", please"'));} finally {store.close();}
});
test('writes reject missing and cross-site origins', () => {
  const url='https://event.example/api/rsvp';assert.equal(sameOrigin(new Request(url)),false);assert.equal(sameOrigin(new Request(url,{headers:{origin:'https://other.example'}})),false);assert.equal(sameOrigin(new Request(url,{headers:{origin:'https://event.example'}})),true);assert.equal(sameOrigin(new Request('http://localhost:3217/api/rsvp',{headers:{host:'127.0.0.1:3217',origin:'http://127.0.0.1:3217'}})),true);assert.equal(sameOrigin(new Request(url,{headers:{host:'event.example',origin:'https://other.example'}})),false);
});
test('request bodies are bounded even without a content-length header', async () => {
  const make=(body:string)=>new Request('https://event.example/api/rsvp',{method:'POST',headers:{'content-type':'application/json'},body});
  await assert.rejects(readJson(make('"'+'a'.repeat(9000)+'"')));assert.deepEqual(await readJson(make('{"ok":true}')),{ok:true});
});

test('trusted Vercel clients have separate login quotas and untrusted headers are ignored locally', () => {
  const one = new Request('https://event.example', {headers:{'x-vercel-forwarded-for':'192.0.2.1'}});
  const two = new Request('https://event.example', {headers:{'x-vercel-forwarded-for':'192.0.2.2'}});
  assert.notEqual(clientRateKey(one,true),clientRateKey(two,true));
  assert.equal(clientRateKey(one,false),clientRateKey(two,false));
  const store=new GuestStore(':memory:');
  try {for(let i=0;i<10;i++) store.allow(clientRateKey(one,true),10,900000);assert.equal(store.allow(clientRateKey(one,true),10,900000),false);assert.equal(store.allow(clientRateKey(two,true),10,900000),true);} finally {store.close();}
});
