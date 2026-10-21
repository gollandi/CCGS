import GuestManager from '@/components/guest-manager';
import './guests.css';
export default function GuestsPage() {
  return <main className="guest-page"><header className="guest-header"><a className="monogram" href="/" aria-label="Return to the invitation">ccgs.</a><a className="guest-text-link" href="/">View invitation</a></header><GuestManager/></main>;
}
