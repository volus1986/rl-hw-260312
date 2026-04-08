import { type Metadata } from 'next';
import { type FC, type ReactNode } from 'react';

import '@/config/styles/globals.css';

export const metadata: Metadata = {
  title: 'rl hw 260312',
  description: 'rl hw 260312',
};

// interface
interface IProps {
  children: ReactNode;
}

// component
const RootLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  // return
  return (
    <html lang='en'>
      <body className='dark'>{children}</body>
    </html>
  );
};

export default RootLayout;
