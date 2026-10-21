import test from 'node:test';
import assert from 'node:assert/strict';
import { discoveries, practicalInformation, portals, stories, currentMenuUrl, locationLinks } from '../src/lib/discovery.ts';

test('the discovery layer contains exactly the six owner-selected catalogue entries',()=>{
  assert.deepEqual(discoveries.map(s=>s.catalogueNumber).sort((a,b)=>a!-b!),[1,6,10,13,14,33]);
  assert.equal(new Set(discoveries.map(s=>s.id)).size,6);
  assert.match(discoveries.find(s=>s.catalogueNumber===33)!.aside,/2019.*not today/);
});
test('every curiosity is reachable from exactly one object, separate from practical information',()=>{
  const routes=portals.flatMap(p=>p.stories);
  assert.deepEqual([...routes].sort((a,b)=>a-b),discoveries.map((_,i)=>i));
  assert.ok(routes.every(i=>stories[i]&&i<discoveries.length));
  assert.deepEqual(practicalInformation.map(s=>s.id),['chef','restaurant','location']);
  assert.ok(practicalInformation.every(s=>s.catalogueNumber===undefined));
});
test('menu stays current through the official page and travel links target the confirmed address',()=>{
  assert.equal(currentMenuUrl,'https://fiftycheyne.com/menus/');
  for(const link of locationLinks){
    const url=new URL(link.url);
    assert.equal(url.hostname,'www.google.com');
    assert.match(url.searchParams.get('destination')??url.searchParams.get('query')??'',/50 Cheyne Walk, Chelsea, London SW3 5LR/);
  }
  assert.deepEqual(locationLinks.slice(1).map(l=>new URL(l.url).searchParams.get('travelmode')),['walking','transit']);
});
