import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/ui/Navbar";
import NextProgressBar from "@/components/ui/NextProgressBar";

export const revalidate = 600;

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Remas Nurul Haqq",
  description: "Website Remaja Masjid Nurul Haqq",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProgressBar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
