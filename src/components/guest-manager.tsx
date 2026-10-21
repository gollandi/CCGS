'use client';
import { useEffect, useState, type FormEvent } from 'react';
import type { Guest } from '@/lib/attendance';
export default function GuestManager() {
  const [guests, setGuests] = useState<Guest[] | null>(null), [signedIn, setSignedIn] = useState<boolean | null>(null), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [query, setQuery] = useState(''), [filter, setFilter] = useState('confirmed');
  async function load() {
    setError('');
    try {
      const response = await fetch('/api/guests', { cache: 'no-store' });
      if (response.status === 401) { setSignedIn(false); setGuests(null); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSignedIn(true); setGuests(data.guests);
    } catch (error) { setError(error instanceof Error ? error.message : 'Could not load the guest list. Please try again.'); }
  }
  useEffect(() => { void load(); }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const password = new FormData(event.currentTarget).get('password');
    try {
      const response = await fetch('/api/guests/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      await load();
    } catch (error) { setError(error instanceof Error ? error.message : 'Sign-in failed. Please try again.'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try { const response = await fetch('/api/guests/session', { method: 'DELETE' }); if (!response.ok) throw new Error(); setGuests(null); setSignedIn(false); }
    catch { setError('Could not sign out. Please try again.'); }
    finally { setBusy(false); }
  }
  async function changeStatus(guest: Guest) {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/guests', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: guest.id, version: guest.version, status: guest.status === 'confirmed' ? 'cancelled' : 'confirmed' }) });
      const data = await response.json();
      if (response.status === 401) { setSignedIn(false); setGuests(null); throw new Error(data.error); }
      if (!response.ok) throw new Error(data.error);
      await load();
    } catch (error) { setError(error instanceof Error ? error.message : 'Could not save the change.'); }
    finally { setBusy(false); }
  }
  if (signedIn === null) return <section className="guest-login"><h1>Guest list</h1>{error ? <><p role="alert">{error}</p><button className="guest-primary" onClick={load}>Try again</button></> : <p role="status">Opening the guest list…</p>}</section>;
  if (!signedIn) return <section className="guest-login"><h1>The evening,<br/>in good company.</h1><p>Sign in to manage the guest list.</p><form className="guest-form" onSubmit={login}><label>Organiser password<input type="password" name="password" autoComplete="current-password" required disabled={busy}/></label>{error && <p className="guest-error" role="alert">{error}</p>}<button className="guest-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form></section>;
  const confirmed = (guests || []).filter(g => g.status === 'confirmed');
  const filtered = (guests || []).filter(g => (filter === 'all' || g.status === filter) && `${g.firstName} ${g.lastName}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const sameName = (g: Guest) => (guests || []).filter(other => other.status === 'confirmed' && `${other.firstName} ${other.lastName}`.toLocaleLowerCase() === `${g.firstName} ${g.lastName}`.toLocaleLowerCase()).length > 1;
  return <section className="guest-register"><div className="guest-register-title"><div><h1>Guest list</h1><p>4 November 2026 · 19:00 · No. Fifty Cheyne</p></div><button className="guest-text-link" onClick={logout} disabled={busy}>Sign out</button></div><p className="guest-totals" aria-live="polite"><strong>{confirmed.length}</strong> confirmed <span>{confirmed.filter(g => g.dietary).length} with dietary requirements</span></p><div className="guest-toolbar"><label>Find a guest<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name"/></label><label>Show<select value={filter} onChange={e => setFilter(e.target.value)}><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option><option value="all">All replies</option></select></label><button className="guest-text-link" onClick={load} disabled={busy}>Refresh</button><a className="guest-text-link" href="/api/guests/export">Export CSV</a></div>{error && <p role="alert" className="guest-error">{error}</p>}{filtered.length === 0 ? <div className="guest-empty"><h2>{guests?.length ? 'No matching replies.' : 'The table is waiting.'}</h2><p>{guests?.length ? 'Try another name or change the filter.' : 'Confirmed RSVPs will appear here as guests reply.'}</p>{!guests?.length && <a className="guest-text-link" href="/rsvp">Open the RSVP form</a>}</div> : <ul className="guest-rows">{filtered.map(g => <li key={g.id}><div className="guest-person"><h2>{g.firstName} {g.lastName}</h2><p>{g.status === 'confirmed' ? 'Confirmed' : 'Cancelled'} · {new Date(g.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Europe/London' })}</p>{g.status === 'confirmed' && sameName(g) && <p className="guest-duplicate">Another reply has this name. Check before changing either.</p>}</div><p className="guest-dietary"><span>Dietary requirements</span>{g.dietary || 'None provided'}</p><button className="guest-text-link" disabled={busy} onClick={() => changeStatus(g)} aria-label={`${g.status === 'confirmed' ? 'Mark cancelled' : 'Restore place'} for ${g.firstName} ${g.lastName}`}>{g.status === 'confirmed' ? 'Mark cancelled' : 'Restore place'}</button></li>)}</ul>}</section>;
}
