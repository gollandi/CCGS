import Experience from '@/components/experience';
import { discovery } from '@/lib/discovery';

function Stamp() {
  return <div className="stamp" aria-label="Consultant only"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><circle cx="50" cy="50" r="41" strokeDasharray="1 3" /><path d="m40 23 3 7h14l3-7-6 3-4-7-4 7z" /><path d="M50 79c-14-9-8-17 0-9 8-8 14 0 0 9Z" /></svg><span>CONSULTANT<br />ONLY</span></div>;
}

export default function Invitation() {
  return (
    <main className="invitation">
      <header className="masthead"><a className="wordmark" href="/" aria-label="CCGS Annual Autumn Event home">Chelsea Centre<br />for Gender Surgery<span className="wordmark-line" aria-hidden="true" /></a><Stamp /></header>
      <div className="composition">
        <section className="event-copy" aria-labelledby="event-title">
          <h1 id="event-title"><span className="annual">Annual</span><span className="autumn">Autumn</span><span className="event">Event<span className="title-dot" aria-hidden="true">.</span></span></h1>
          <div className="event-details">
            <time dateTime="2026-11-04T19:00:00+00:00" className="date"><span className="date-day">04</span><span className="date-rest">November 2026<span>Wednesday · 19:00</span></span></time>
            <address><span className="venue-name">No. Fifty Cheyne</span><span>50 Cheyne Walk · Chelsea · London SW3 5LR</span></address>
            <details className="rsvp"><summary>RSVP <span aria-hidden="true">↗</span></summary><p>RSVP details will follow. No response is being collected yet.</p></details>
          </div>
        </section>
        <Experience />
      </div>
      <footer className="closing-line"><span>Celebrating what we&apos;ve built together.</span><svg viewBox="0 0 36 36" aria-hidden="true"><path d="M18 29C-3 12 9 2 18 14 28 1 40 12 18 29Z" /></svg></footer>
      <noscript><details className="no-script-discovery"><summary>A little Chelsea secret</summary><h2>{discovery.title}</h2><p>{discovery.body}</p><a href={discovery.sourceUrl}>Read the source at No. Fifty Cheyne</a></details></noscript>
    </main>
  );
}
