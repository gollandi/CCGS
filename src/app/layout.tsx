import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'CCGS — Annual Autumn Event 2026',
  description: 'Celebrating what we have built together. 4 November 2026, 19:00, No. Fifty Cheyne, Chelsea.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
