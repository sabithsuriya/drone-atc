import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "GOD'S EYE — SKYBREACH OPS PORTAL",
  description: "911 Airlines Internal Operations Dashboard — DroNet v2.3 Command Interface — SKYBREACH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="app-root" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
