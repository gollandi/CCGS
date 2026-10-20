import Experience from '@/components/experience';
import { discoveries } from '@/lib/discovery';

export default function Invitation() {
  return <main className="invitation">
    <header className="masthead">
      <a href="/" className="wordmark" aria-label="Chelsea Centre for Gender Surgery home"><span className="monogram">ccgs<span aria-hidden="true">.</span></span><span>Chelsea Centre<br />for Gender Surgery</span></a>
      <span className="audience">CONSULTANT ONLY</span>
    </header>
    <section className="event-copy" aria-labelledby="event-title">
      <h1 id="event-title">Annual<br /><span>Autumn Event</span><span className="event-year">2026</span></h1>
    </section>
    <Experience />
    <section className="event-details" aria-label="The evening">
      <time dateTime="2026-11-04T19:00:00+00:00"><strong>4 November 2026</strong><span>Wednesday, 19:00</span></time>
      <address><strong>No. Fifty Cheyne</strong><span>50 Cheyne Walk, Chelsea<br />London SW3 5LR</span></address>
      <div className="invitation-actions"><a href="/ccgs-autumn-2026.ics" download className="calendar-link">Keep the evening<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a><details className="rsvp"><summary>RSVP details</summary><p>Details will follow from the organiser. No response is being collected here yet.</p></details></div>
    </section>
    <footer>Celebrating what we&apos;ve built together.</footer>
    <noscript><div className="no-script-stories">{discoveries.map(story => <details key={story.id}><summary>{story.title}</summary><p>{story.body}</p><p>{story.aside}</p>{story.sources.map(source => <a key={source.url} href={source.url}>{source.label}</a>)}</details>)}</div></noscript>
  </main>;
}
