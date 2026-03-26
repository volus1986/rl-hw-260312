import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import '@/config/styles/globals.css';

export const metadata: Metadata = {
  title: 'rl hw 260312',
  description: 'rl hw 260312',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className='dark'>{children}</body>
    </html>
  );
};

export default RootLayout;
