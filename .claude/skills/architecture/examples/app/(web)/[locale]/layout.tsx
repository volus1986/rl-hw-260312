import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

import { fontMono, fontSans, fontSerif } from '@/config/styles/fonts'
import { RestApiProvider } from '@/pkg/rest-api'

import '@/config/styles/globals.css'

// metadata
export const metadata: Metadata = {
  title: '<app title>',
  description: '<app description>',
}

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props

  const { locale } = await params
  const messages = await getMessages()

  // return
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <RestApiProvider>{children}</RestApiProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
