import { isOrganiser } from '@/lib/server/guest-auth';
import { guestStore } from '@/lib/server/guest-store';
import { privateHeaders, readJson, sameOrigin } from '@/lib/server/request-guards';
export const runtime = 'nodejs';
export async function GET() {
  try {
    if (!await isOrganiser()) return Response.json({ error: 'Please sign in.' }, { status: 401, headers: privateHeaders });
    return Response.json({ guests: await (await guestStore()).list() }, { headers: privateHeaders });
  } catch { return Response.json({ error: 'The guest list is temporarily unavailable.' }, { status: 503, headers: privateHeaders }); }
}
export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  try {
    if (!await isOrganiser()) return Response.json({ error: 'Please sign in again.' }, { status: 401, headers: privateHeaders });
    const input = await readJson(request) as { id?: unknown; status?: unknown; version?: unknown };
    if (typeof input.id !== 'string' || !['confirmed', 'cancelled'].includes(String(input.status)) || !Number.isInteger(input.version)) return Response.json({ error: 'Invalid change.' }, { status: 400, headers: privateHeaders });
    const saved = await (await guestStore()).update(input.id, input.status as 'confirmed' | 'cancelled', input.version as number);
    return Response.json(saved ? { ok: true } : { error: 'This entry changed. Refresh the list and try again.' }, { status: saved ? 200 : 409, headers: privateHeaders });
  } catch { return Response.json({ error: 'The change could not be saved.' }, { status: 503, headers: privateHeaders }); }
}
