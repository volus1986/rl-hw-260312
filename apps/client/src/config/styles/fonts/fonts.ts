import { Delius_Swash_Caps, Gabriela, Space_Mono } from 'next/font/google';

export const fontSans = Gabriela({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontSerif = Delius_Swash_Caps({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const fontMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
