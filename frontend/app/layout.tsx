import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boucherie Moderne',
  description: 'Boutique premium de viande en ligne - Headless e-commerce moderne',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
