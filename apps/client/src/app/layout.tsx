import { type Metadata } from 'next';
import { type FC, type ReactNode } from 'react';

import { fontMono, fontSans, fontSerif } from '@/config/styles/fonts';
import { ThemeProvider } from '@/pkg/shadcn';

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
    <html
      lang='en'
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
