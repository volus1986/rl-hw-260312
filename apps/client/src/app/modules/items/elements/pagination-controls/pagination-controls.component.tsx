'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { usePostListQuery } from '@/app/entities/api/post-list';
import { Button } from '@/app/shared/components';
import { usePathname, useRouter } from '@/pkg/locale';

import { PAGINATION_PARAMS } from '../../items.constant';

// interface
interface IProps {}

// component
const PaginationControlsComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('ItemsPage');
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get(PAGINATION_PARAMS.pageParamKey)) || PAGINATION_PARAMS.defaultPage;
  const limit = Number(searchParams.get(PAGINATION_PARAMS.limitParamKey)) || PAGINATION_PARAMS.defaultLimit;

  const posts = usePostListQuery(page, limit);

  if (posts.isError) return null;

  const pages = Math.floor((posts.data?.meta?.total_results ?? 0) / limit);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  // return
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
