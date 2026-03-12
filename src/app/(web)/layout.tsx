import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "rl hw 260312",
  description: "rl hw 260312",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
