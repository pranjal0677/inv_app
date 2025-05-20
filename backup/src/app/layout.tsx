import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "Create professional invoices online easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className}`}
        suppressHydrationWarning
        style={{ 
          backgroundColor: "#ffffff", 
          color: "#000000", 
          fontFamily: "Inter, system-ui, -apple-system, sans-serif" 
        }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
