import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/Toaster";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navbar from "@/components/Navbar";
import { icons } from "lucide-react";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Tathya",
  description: "Your new shopping experience",
  icons:
    [
      {
        url: '/icon?<generated>'
      }
    ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning={true} >
        <Providers>
          {children}
          <Toaster />
          <ReactQueryDevtools />
        </Providers>
      </body>
    </html>
  );
}
