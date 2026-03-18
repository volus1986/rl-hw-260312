import type { Metadata } from "next";
import "@/app/globals.css";

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
      <body className="dark">{children}</body>
    </html>
  );
}
