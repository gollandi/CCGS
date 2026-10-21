import RsvpForm from '@/components/rsvp-form';
import '../guests/guests.css';
export default function RsvpPage() {
  return <main className="guest-page"><header className="guest-header"><a className="monogram" href="/" aria-label="Return to the invitation">ccgs.</a><a className="guest-text-link" href="/">Back to the evening</a></header><div className="rsvp-layout"><section className="rsvp-intro"><h1>A place <br/>at the table.</h1><p>Annual Autumn Event 2026</p><div className="rsvp-venue"><strong>4 November · 19:00</strong><p>No. Fifty Cheyne<br/>50 Cheyne Walk, Chelsea<br/>London SW3 5LR</p></div><img src="/images/chelsea/restaurant.jpg" alt="The dining room at No. Fifty Cheyne" width={1280} height={720}/></section><section className="rsvp-entry" aria-label="Confirm attendance"><h2>Join us.</h2><p>For CCGS consultants. Add your name and we’ll keep your place.</p><RsvpForm/></section></div></main>;
}
