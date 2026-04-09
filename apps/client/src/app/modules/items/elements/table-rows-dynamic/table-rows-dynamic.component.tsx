'use client';

import { useSearchParams } from 'next/navigation';
import { type FC } from 'react';

import { usePhotoListQuery } from '@/app/entities/api/photo-list';
import { usePathname, useRouter } from '@/pkg/locale';

import { PAGINATION_PARAMS } from '../../items.constant';
import { TableRowsComponent } from '../table-rows';
import { TableRowsSkeletonComponent } from '../table-rows-skeleton';

// interface
interface IProps {}

// component
const TableRowsDynamicComponent: FC<Readonly<IProps>> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get(PAGINATION_PARAMS.pageParamKey)) || PAGINATION_PARAMS.defaultPage;
  const limit = Number(searchParams.get(PAGINATION_PARAMS.limitParamKey)) || PAGINATION_PARAMS.defaultLimit;

  const photos = usePhotoListQuery(page, limit);

  const handleItemClick = (id: number) => {
    router.push(`${pathname}/${id}`);
  };

  if (photos.isLoading) return <TableRowsSkeletonComponent />;

  if (photos.isError) return <p className='text-center text-destructive py-4'>{photos.error.message}</p>;

  // return
  return <TableRowsComponent data={photos.data?.data} handleItemClickCallback={handleItemClick} />;
};

export default TableRowsDynamicComponent;
