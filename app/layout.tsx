import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

import './globals.css';
import NextProgressBar from '@/components/NextProgressBar';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Remas Nurul Haqq',
  description: 'Website Remaja Masjid Nurul Haqq',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <NextProgressBar />
      </body>
    </html>
  );
}
