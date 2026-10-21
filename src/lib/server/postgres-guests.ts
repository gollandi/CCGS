import postgres from 'postgres';
import { randomUUID } from 'node:crypto';
import type { Guest, Registration } from '../attendance.ts';
// The schema is installed explicitly with scripts/migrate-guests.ts, never during a request.
export class PostgresGuestStore {
  sql: ReturnType<typeof postgres>;
  constructor(url: string) { this.sql = postgres(url, { max: 2, idle_timeout: 20, connect_timeout: 10, prepare: false }); }
  async add(input: Registration) {
    const now = new Date().toISOString();
    const rows = await this.sql`INSERT INTO ccgs_guests (id,request_id,first_name,last_name,dietary,dietary_consent,created_at,updated_at)
      VALUES (${randomUUID()},${input.requestId},${input.firstName},${input.lastName},${input.dietary},${input.dietaryConsent},${now},${now})
      ON CONFLICT (request_id) DO NOTHING RETURNING id`;
    const [existing] = await this.sql`SELECT first_name,last_name,dietary,dietary_consent FROM ccgs_guests WHERE request_id=${input.requestId}`;
    const conflict = existing.first_name !== input.firstName || existing.last_name !== input.lastName || existing.dietary !== input.dietary || existing.dietary_consent !== input.dietaryConsent;
    return { inserted: rows.length === 1, conflict };
  }
  async list(): Promise<Guest[]> {
    return await this.sql<Guest[]>`SELECT id,first_name AS "firstName",last_name AS "lastName",dietary,status,created_at AS "createdAt",updated_at AS "updatedAt",version FROM ccgs_guests ORDER BY lower(last_name),lower(first_name)`;
  }
  async update(id: string, status: Guest['status'], version: number) {
    const rows = await this.sql`UPDATE ccgs_guests SET status=${status},updated_at=${new Date().toISOString()},version=version+1 WHERE id=${id} AND version=${version} RETURNING id`;
    return rows.length === 1;
  }
  async allow(key: string, maximum: number, windowMs: number, now = Date.now()) {
    const [row] = await this.sql`INSERT INTO ccgs_limits (key,count,expires) VALUES (${key},1,${now + windowMs})
      ON CONFLICT(key) DO UPDATE SET count=CASE WHEN ccgs_limits.expires<=${now} THEN 1 ELSE ccgs_limits.count+1 END,
      expires=CASE WHEN ccgs_limits.expires<=${now} THEN excluded.expires ELSE ccgs_limits.expires END RETURNING count`;
    return row.count <= maximum;
  }
  async saveSession(hash: string, expires: number) { await this.sql`INSERT INTO ccgs_sessions (token_hash,expires) VALUES (${hash},${expires})`; }
  async sessionExpiry(hash: string) { const [row] = await this.sql`SELECT expires FROM ccgs_sessions WHERE token_hash=${hash}`; return row ? Number(row.expires) : undefined; }
  async revokeSession(hash: string) { await this.sql`UPDATE ccgs_sessions SET expires=0 WHERE token_hash=${hash}`; }
}
