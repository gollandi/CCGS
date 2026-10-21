import { InputError, validateRegistration } from '@/lib/attendance';
import { guestStore } from '@/lib/server/guest-store';
import { authConfigured } from '@/lib/server/guest-auth';
import { clientRateKey, privateHeaders, readJson, sameOrigin } from '@/lib/server/request-guards';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: 'Please submit the form from this website.' }, { status: 403, headers: privateHeaders });
  try {
    const input = validateRegistration(await readJson(request));
    if (!authConfigured()) return Response.json({ error: 'Online RSVP is not ready yet. Please reply in the Consultants WhatsApp chat.' }, { status: 503, headers: privateHeaders });
    const store = await guestStore();
    if (!await store.allow(`rsvp:${clientRateKey(request)}`, 15, 60_000) || !await store.allow('rsvp:all', 60, 60_000)) return Response.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429, headers: privateHeaders });
    const result = await (await guestStore()).add(input);
    if (result.conflict) return Response.json({ error: 'Your earlier reply was saved, but these changes were not. Please contact the organiser in the Consultants WhatsApp chat to update your details.' }, { status: 409, headers: privateHeaders });
    return Response.json({ confirmed: true }, { headers: privateHeaders });
  } catch (error) {
    return Response.json({ error: error instanceof InputError ? error.message : 'We could not save your reply. Please try again or reply in the Consultants WhatsApp chat.' }, { status: error instanceof InputError ? 400 : 503, headers: privateHeaders });
  }
}
