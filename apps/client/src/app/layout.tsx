import { type Metadata } from 'next';
import { type FC, type ReactNode } from 'react';

import '@/config/styles/globals.css';

export const metadata: Metadata = {
  title: 'rl hw 260312',
  description: 'rl hw 260312',
};

interface IProps {
  children: ReactNode;
}

const RootLayout: FC<Readonly<IProps>> = (props) => {
  return (
    <html lang='en'>
      <body className='dark'>{props.children}</body>
    </html>
  );
};

export default RootLayout;
