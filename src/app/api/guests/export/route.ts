import { isOrganiser } from '@/lib/server/guest-auth';
import { guestStore } from '@/lib/server/guest-store';
import { guestsCsv } from '@/lib/attendance';
import { privateHeaders } from '@/lib/server/request-guards';
export const runtime = 'nodejs';
export async function GET() {
  try {
    if (!await isOrganiser()) return new Response('Please sign in.', { status: 401, headers: privateHeaders });
    return new Response(guestsCsv(await (await guestStore()).list()), { headers: { ...privateHeaders, 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="ccgs-guests.csv"' } });
  } catch { return new Response('Export is temporarily unavailable.', { status: 503, headers: privateHeaders }); }
}
