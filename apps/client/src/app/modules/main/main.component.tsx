import { getLocale } from 'next-intl/server';
import { type FC } from 'react';

import { redirect } from '@/pkg/locale';

// interface
interface IProps {}

// component
const MainComponent: FC<Readonly<IProps>> = async () => {
  const currentLocale = await getLocale();

  redirect({
    href: '/items',
    locale: currentLocale ?? 'en',
  });

  // return
  return null;
};

export default MainComponent;
