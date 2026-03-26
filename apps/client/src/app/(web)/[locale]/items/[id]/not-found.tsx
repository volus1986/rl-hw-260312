'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

const NotFound = () => {
  const router = useRouter();
  const t = useTranslations('ItemsPage');

  const handleClick = () => {
    router.push('/items');
  };

  return (
    <div className='flex flex-col items-center justify-center mt-80'>
      <h2 className='mb-4 text-3xl font-semibold'>{t('pageNotFoundTitle')}</h2>
      <p className='mb-6'>{t('pageNotFoundDescription')}</p>
      <Button size='lg' className='rounded-lg text-base' onClick={handleClick}>
        {t('pageNotFoundGoToItemsPageButton')}
      </Button>
    </div>
  );
};

export default NotFound;
