import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { FC, ReactNode } from 'react';

import { Header } from '@/app/widgets/header';

interface IProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {props.children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
