import { cookies } from 'next/headers';
import { authConfigured, checkPassword, createSession, endSession, sessionCookie, sessionLifetime } from '@/lib/server/guest-auth';
import { guestStore } from '@/lib/server/guest-store';
import { clientRateKey, privateHeaders, readJson, sameOrigin } from '@/lib/server/request-guards';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: 'Please sign in from this website.' }, { status: 403, headers: privateHeaders });
  try {
    if (!authConfigured()) return Response.json({ error: 'Organiser access has not been configured.' }, { status: 503, headers: privateHeaders });
    const store = await guestStore();
    if (!await store.allow(`login:${clientRateKey(request)}`, 10, 15 * 60_000) || !await store.allow('login:all', 600, 15 * 60_000)) return Response.json({ error: 'Too many attempts. Please try again in 15 minutes.' }, { status: 429, headers: privateHeaders });
    const input = await readJson(request) as { password?: unknown };
    if (typeof input.password !== 'string' || input.password.length > 256 || !checkPassword(input.password)) return Response.json({ error: 'That password was not recognised.' }, { status: 401, headers: privateHeaders });
    (await cookies()).set(sessionCookie, await createSession(), { httpOnly: true, secure: !!process.env.VERCEL || new URL(request.headers.get('origin')!).protocol === 'https:', sameSite: 'strict', path: '/', maxAge: sessionLifetime });
    return Response.json({ ok: true }, { headers: privateHeaders });
  } catch { return Response.json({ error: 'Sign-in is unavailable. Please try again.' }, { status: 503, headers: privateHeaders }); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  await endSession();
  (await cookies()).delete(sessionCookie);
  return Response.json({ ok: true }, { headers: privateHeaders });
}
