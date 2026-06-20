import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Chargeback Lifecycle Tracker | Real Rails',
  description: 'Real-time chargeback dispute tracking and analytics dashboard',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text-primary">{children}</body>
    </html>
  );
}
