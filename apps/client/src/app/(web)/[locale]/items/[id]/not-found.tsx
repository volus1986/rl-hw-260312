'use client';

import { type NextPage } from 'next';
import { useTranslations } from 'next-intl';

import { NotFoundComponent } from '@/app/modules/not-found';

// component
const NotFound: NextPage = () => {
  const t = useTranslations('ItemsPage');

  //return
  return (
    <NotFoundComponent
      description={t('pageNotFoundTitle')}
      message={t('pageNotFoundDescription')}
      backButtonUrl='/items'
      backButtonText={t('pageNotFoundGoToItemsPageButton')}
    />
  );
};

export default NotFound;
