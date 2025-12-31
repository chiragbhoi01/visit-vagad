import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

export const metadata: Metadata = {
  title: 'VisitVagad - The Tribal Circuit of Rajasthan',
  description: 'Explore Banswara and Dungarpur - The City of Hundred Islands and The City of Hills.',
}

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  )
}
