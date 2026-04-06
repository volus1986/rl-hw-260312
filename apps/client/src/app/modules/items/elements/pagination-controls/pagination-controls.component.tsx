'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Button } from '@/app/shared/ui';
import { usePathname, useRouter } from '@/pkg/locale';

const PaginationControlsComponent: FC = () => {
  const t = useTranslations('ItemsPage');
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;
  const pages = Math.floor(100 / limit); // todo: mock data because API has no data about the pagination

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='mt-4 flex gap-1 justify-center'>
      <Button disabled={page <= 1} onClick={() => replace(createPageURL(page - 1), { scroll: false })}>
        {t('prevNavButton')}
      </Button>

      <Button disabled={page >= pages} onClick={() => replace(createPageURL(page + 1), { scroll: false })}>
        {t('nextNavButton')}
      </Button>
    </div>
  );
};

export default PaginationControlsComponent;
