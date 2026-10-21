import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || request.headers.get('sec-fetch-site') === 'cross-site') return false;
  try {
    const parsed = new URL(origin);
    const host = request.headers.get('host') || new URL(request.url).host;
    return ['http:', 'https:'].includes(parsed.protocol) && parsed.host === host;
  } catch { return false; }
}
export async function readJson(request: Request): Promise<unknown> {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new Error('Unsupported request');
  if (Number(request.headers.get('content-length')) > 8192) throw new Error('Request too large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing request');
  let size = 0;
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); throw new Error('Request too large'); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export const privateHeaders = { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex, nofollow' };

export function clientRateKey(request: Request, vercel = !!process.env.VERCEL) {
  // Only trust Vercel's overwritten client header when executing on Vercel.
  const candidate = vercel ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : undefined;
  const client = candidate && isIP(candidate) ? candidate : 'local-or-unknown';
  return createHash('sha256').update(client).digest('hex');
}
