# RSVP and guest register

## Scope and owner decisions

On 21 October 2026 the owner replaced the WhatsApp-only RSVP instruction with self-registration: first name, surname and optional dietary requirements. The owner selected Vercel with a persistent database and explicitly authorised creating the required resources and deploying the completed page. The invitation, membrane and six discoveries are preserved.

- `/rsvp`: attendance form and confirmation only after a successful database write. Optional dietary information requires explicit permission to use it for the meal and share it with the restaurant.
- `/guests`: organiser sign-in, confirmed count, dietary count, name search, status filter, refresh, reversible cancellation/restoration and CSV export.
- Anonymous visitors cannot read the guest list or export. Names and dietary details never go in URLs, source control, public pages or analytics.
- No email, WhatsApp message or restaurant notification is sent automatically. Corrections to an RSVP are requested through the Consultants chat; the organiser can cancel/restore attendance.

## Persistence and access

Local preview uses SQLite outside the repository, at `~/.local/share/ccgs-autumn-2026/guests.sqlite` by default. Override with an absolute `CCGS_DATA_DIR` on a persistent disk. Vercel uses PostgreSQL through `DATABASE_URL`; SQLite deliberately refuses to run on Vercel/Lambda without a remote database.

Run `pnpm guests:setup` once for local organiser credentials. It writes a scrypt hash and a separate private password handover in that data directory, mode 0600. It refuses to overwrite existing credentials. Keep the password in a password manager. Production receives only the hash configuration in the sensitive `CCGS_ORGANISER_CREDENTIALS` environment variable. Neither the clear password nor database credentials belong in the repository.

Sessions use random tokens, store their SHA-256 hashes in the database, expire after eight hours and are revoked on sign-out. Cookies are HttpOnly and SameSite=Strict; production cookies are Secure. Login throttles use Vercel's overwritten client IP header, hashed before storage, plus a broader abuse ceiling. Other hosts ignore forwarded IP headers and use a conservative shared local bucket. API writes validate the browser origin. Guest responses and exports are no-store.

The form uses an idempotency key for retries. An identical retry succeeds without duplication; a changed payload using a saved key returns a conflict with a clear recovery message. Name matching never grants permission to edit an existing guest. Separate replies with the same name are flagged in the organiser view. Status updates use version checks.

## Deployment

Target: Vercel project `ccgs-autumn-2026`, team `GGO Med ltd` (`ggo-med`), Node 24.x. Database: dedicated Neon resource `ccgs-autumn-2026`, region London, existing installation plan Launch. Resource ID `sparkling-bonus-69560184`; Vercel storage ID `store_ikPwhig20URxLd6O`. The database and organiser secret are connected to production only.

`pnpm guests:migrate` prints a dry run. `pnpm guests:migrate --apply` applies the checked-in create-if-absent schema using the configured database. Vercel's build command is `pnpm guests:migrate --if-production && pnpm build`; the production branch applies this schema, other environments skip it. Migrations create only the event's three namespaced tables. Future destructive migrations require separate review.

Production aliases are public; Vercel protects preview and unique deployment URLs. `/guests` remains protected by the application's own organiser login. The deployment is not a substitute for the application login.

## Production verification — 21 October 2026

OBSERVED: deployment `dpl_FKRCXXzz8p6pEKUD1FjHGdEDTkGQ` reached `READY` from runtime commit `0797dd87b2da3f25595798266d4d6180a3058233`. Public invitation: https://ccgs-autumn-2026.vercel.app/ ; organiser access: https://ccgs-autumn-2026.vercel.app/guests . Later documentation-only commits do not change that deployed runtime.

A synthetic RSVP submitted through the production browser reached the confirmation state and was independently read back through the authenticated API from the connected database. CSV export returned 200; anonymous list/export requests returned 401; a cross-origin authenticated write returned 403; a signed-out session returned 401. The session cookie was Secure, HttpOnly and SameSite=Strict, and private responses were no-store. The test record was reversibly cancelled after verification, leaving zero confirmed guests at that moment.

Production form and invitation were inspected at a 390px responsive viewport and the form at desktop width. The isolated local register was checked with 80-character first and last names: document width remained 390px and the 340px heading had no internal overflow. Captures are evidence of browser responsive emulation, not a physical phone test. The organiser password handover is stored locally outside the repository, with file permissions 0600.

## Checks and limits

Nineteen automated tests pass. A separate local PostgreSQL 17 database was used for synthetic browser and API checks: submit, confirmation, organiser sign-in, cancellation, restoration, CSV, identical retry, conflicting changed retry, unauthorised reads and cross-site rejection. Actual names were not used in testing. Mobile and desktop captures are stored in the chat's outputs folder.

This is a small event register, not a clinical CRM. Physical-device testing and formal security certification are not claimed. Maintain the database through the event and agree a post-event retention/cleanup date with the organiser; no automatic deletion is configured. CSV exports contain private information and are for the organiser's handling. Review dietary details before passing the necessary meal instructions to the venue.
