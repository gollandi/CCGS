import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, chmodSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, isAbsolute } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Guest, Registration } from '../attendance.ts';

// Data lives outside the checkout. Never use ephemeral serverless storage for RSVPs.
export function dataDirectory() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) throw new Error('Persistent RSVP storage has not been configured for this hosting platform.');
  const directory = process.env.CCGS_DATA_DIR || join(homedir(), '.local', 'share', 'ccgs-autumn-2026');
  if (!isAbsolute(directory)) throw new Error('CCGS_DATA_DIR must be an absolute persistent path.');
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  return directory;
}
export class GuestStore {
  db: DatabaseSync;
  constructor(path: string) {
    this.db = new DatabaseSync(path);
    if (path !== ':memory:') chmodSync(path, 0o600);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS guests (
        id TEXT PRIMARY KEY, requestId TEXT UNIQUE NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL,
        dietary TEXT NOT NULL, dietaryConsent INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'confirmed',
        createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS sessions (tokenHash TEXT PRIMARY KEY, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  }
  add(input: Registration) {
    const now = new Date().toISOString(), id = randomUUID();
    const result = this.db.prepare('INSERT OR IGNORE INTO guests (id,requestId,firstName,lastName,dietary,dietaryConsent,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, input.requestId, input.firstName, input.lastName, input.dietary, Number(input.dietaryConsent), now, now);
    const existing = this.db.prepare('SELECT firstName,lastName,dietary,dietaryConsent FROM guests WHERE requestId=?').get(input.requestId) as { firstName:string; lastName:string; dietary:string; dietaryConsent:number };
    const conflict = existing.firstName !== input.firstName || existing.lastName !== input.lastName || existing.dietary !== input.dietary || Boolean(existing.dietaryConsent) !== input.dietaryConsent;
    return { inserted: result.changes === 1, conflict };
  }
  list(): Guest[] {
    return this.db.prepare('SELECT id,firstName,lastName,dietary,status,createdAt,updatedAt,version FROM guests ORDER BY lastName COLLATE NOCASE, firstName COLLATE NOCASE').all() as Guest[];
  }
  update(id: string, status: Guest['status'], version: number) {
    return this.db.prepare('UPDATE guests SET status=?,updatedAt=?,version=version+1 WHERE id=? AND version=?').run(status, new Date().toISOString(), id, version).changes === 1;
  }
  allow(key: string, maximum: number, windowMs: number, now = Date.now()) {
    // A single upsert makes concurrent attempts share the same limit.
    const row = this.db.prepare(`INSERT INTO limits (key,count,expires) VALUES (?,1,?)
      ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires<=? THEN 1 ELSE count+1 END,
      expires=CASE WHEN expires<=? THEN excluded.expires ELSE expires END RETURNING count`).get(key, now + windowMs, now, now) as { count: number };
    return row.count <= maximum;
  }
  saveSession(hash: string, expires: number) { this.db.prepare('INSERT INTO sessions (tokenHash,expires) VALUES (?,?)').run(hash, expires); }
  sessionExpiry(hash: string) { return (this.db.prepare('SELECT expires FROM sessions WHERE tokenHash=?').get(hash) as {expires:number} | undefined)?.expires; }
  revokeSession(hash: string) { this.db.prepare('UPDATE sessions SET expires=0 WHERE tokenHash=?').run(hash); }
  close() { this.db.close(); }
}
type Store = Pick<GuestStore, 'add' | 'list' | 'update' | 'allow' | 'saveSession' | 'sessionExpiry' | 'revokeSession'>;
type AsyncStore = { [K in keyof Store]: (...args: Parameters<Store[K]>) => Promise<ReturnType<Store[K]>> | ReturnType<Store[K]> };
let singleton: Promise<AsyncStore> | undefined;
export async function guestStore(): Promise<AsyncStore> {
  if (!singleton) singleton = (async () => {
    if (process.env.DATABASE_URL) {
      const { PostgresGuestStore } = await import('./postgres-guests.ts');
      return new PostgresGuestStore(process.env.DATABASE_URL);
    }
    return new GuestStore(join(dataDirectory(), 'guests.sqlite'));
  })().catch(error => { singleton = undefined; throw error; });
  return singleton;
}
