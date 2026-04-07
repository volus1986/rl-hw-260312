import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { FC, ReactNode } from 'react';

import { Header } from '@/app/widgets/header';
import { RestApiProvider } from '@/pkg/rest-api';

interface IProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RestApiProvider>
        <Header />
        {props.children}
      </RestApiProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
