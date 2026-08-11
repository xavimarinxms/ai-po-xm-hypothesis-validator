import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hypothesis Validator — by Xavi Marín',
  description: 'Define A/B test hypotheses and calculate statistical significance with chi-square test. All client-side, no backend needed. Part of the PO Toolkit by Xavi Marín.',
  authors: [{ name: 'Xavi Marín', url: 'https://xavimarin.net' }],
  metadataBase: new URL('https://hypothesis-validator.xavimarin.net'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900 min-h-screen antialiased">{children}</body>
    </html>
  );
}
