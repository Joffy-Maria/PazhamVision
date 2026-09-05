import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pazzham Run",
  description: "A banana-powered temple run.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
