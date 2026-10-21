import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { dataDirectory, guestStore } from './guest-store.ts';
export const sessionCookie = 'ccgs-organiser';
export const sessionLifetime = 8 * 60 * 60;
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');
export function authConfigured() { try { credentials(); return true; } catch { return false; } }
function credentials(): { salt: string; hash: string } {
  const config = process.env.CCGS_ORGANISER_CREDENTIALS ? JSON.parse(process.env.CCGS_ORGANISER_CREDENTIALS) : JSON.parse(readFileSync(join(dataDirectory(), 'organiser.json'), 'utf8'));
  if (!/^[a-f0-9]{64}$/.test(config.salt) || !/^[a-f0-9]{128}$/.test(config.hash)) throw new Error('Invalid organiser configuration');
  return config;
}
export function checkPassword(password: string) {
  const config = credentials();
  const candidate = scryptSync(password, config.salt, 64), expected = Buffer.from(config.hash, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
export async function createSession() {
  const token = randomBytes(32).toString('base64url');
  await (await guestStore()).saveSession(digest(token), Date.now() + sessionLifetime * 1000);
  return token;
}
export async function isOrganiser() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token || !/^[\w-]{43}$/.test(token)) return false;
  const expires = await (await guestStore()).sessionExpiry(digest(token));
  return !!expires && expires > Date.now();
}
export async function endSession() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (token) await (await guestStore()).revokeSession(digest(token));
}
