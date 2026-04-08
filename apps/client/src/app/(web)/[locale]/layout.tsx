import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { FC, ReactNode } from 'react';

import { Header } from '@/app/widgets/header';
import { RestApiProvider } from '@/pkg/rest-api';

// interface
interface IProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props;

  const { locale } = await params;
  const messages = await getMessages();

  // return
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RestApiProvider>
        <Header />

        {children}
      </RestApiProvider>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
