'use client';
import { useRef, useState, type FormEvent } from 'react';
export default function RsvpForm() {
  const [dietary, setDietary] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState(''), [confirmed, setConfirmed] = useState(false);
  const requestId = useRef('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true); setError('');
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName: form.get('firstName'), lastName: form.get('lastName'), dietary, dietaryConsent: form.get('dietaryConsent') === 'on', requestId: requestId.current }) });
      const result = await response.json();
      if (!response.ok || result.confirmed !== true) throw new Error(result.error || 'We could not save your reply. Please try again.');
      setConfirmed(true);
    } catch (error) { setError(error instanceof Error ? error.message : 'Please check your connection and try again.'); }
    finally { setBusy(false); }
  }
  if (confirmed) return <section className="rsvp-confirmed" role="status"><h2>You’re on the list.</h2><p>We look forward to seeing you at No. Fifty Cheyne.</p><p><strong>4 November 2026 · 19:00</strong></p><a className="guest-primary" href="/ccgs-autumn-2026.ics" download>Keep the evening</a><p className="guest-small">Need to change your reply? Let us know in the Consultants WhatsApp chat.</p><a className="guest-text-link" href="/">Return to the invitation</a></section>;
  return <form onSubmit={submit} className="guest-form">
    <div className="guest-name-fields"><label>First name<input name="firstName" autoComplete="given-name" required maxLength={80} disabled={busy}/></label><label>Last name<input name="lastName" autoComplete="family-name" required maxLength={80} disabled={busy}/></label></div>
    <label>Dietary requirements <span className="guest-optional">Optional</span><textarea name="dietary" value={dietary} onChange={e => setDietary(e.target.value)} maxLength={500} rows={3} aria-describedby="dietary-help" disabled={busy}/></label>
    <p id="dietary-help" className="guest-small">Anything we should know to arrange your meal. Please share only what is needed.</p>
    {dietary.trim() && <label className="guest-consent"><input type="checkbox" name="dietaryConsent" required disabled={busy}/><span>I agree that the organiser may use these details and share them with the restaurant to arrange my meal.</span></label>}
    <p className="guest-small">Your reply is visible only to the organiser. Dietary requirements may be passed to the restaurant for this event.</p>
    {error && <p role="alert" className="guest-error">{error}</p>}
    <button className="guest-primary" type="submit" disabled={busy}>{busy ? 'Saving your reply…' : 'Confirm my place'}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
    <p className="guest-small">If you need help, reply in the Consultants WhatsApp chat.</p>
    <noscript><p>Please enable JavaScript to RSVP online, or reply in the Consultants WhatsApp chat.</p></noscript>
  </form>;
}
