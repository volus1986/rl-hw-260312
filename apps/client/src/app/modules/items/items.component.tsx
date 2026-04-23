'use client';

import { useSearchParams } from 'next/navigation';
import { type FC } from 'react';

import { usePhotoListQuery } from '@/app/entities/api/photo-list';
import { PaginationControlsComponent } from '@/app/shared/components/pagination-controls';
import { usePathname } from '@/pkg/locale';

import { ItemsListComponent } from './elements';
import { PAGINATION_PARAMS } from './items.constant';

// interface
interface IProps {}

// component
const ItemsComponent: FC<Readonly<IProps>> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get(PAGINATION_PARAMS.pageParamKey)) || PAGINATION_PARAMS.defaultPage;
  const limit = Number(searchParams.get(PAGINATION_PARAMS.limitParamKey)) || PAGINATION_PARAMS.defaultLimit;

  const photos = usePhotoListQuery(page, limit);

  const totalPages = Math.floor((photos.data?.meta?.total_results ?? 0) / limit);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  // return
  return (
    <div className='grid justify-center py-8'>
      <div className='w-[960]'>
        <h1 className='text-center'></h1>

        <ItemsListComponent />

        <PaginationControlsComponent
          page={page}
          totalPages={totalPages}
          prevHref={createPageURL(page - 1)}
          nextHref={createPageURL(page + 1)}
        />
      </div>
    </div>
  );
};

export default ItemsComponent;
