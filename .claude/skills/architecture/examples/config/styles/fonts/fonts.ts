import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'

// sans
export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// serif
export const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
})

// mono
export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})
