'use client';

import { useSearchParams } from 'next/navigation';
import { type FC } from 'react';

import { usePostListService } from '@/app/features/get-post-list';
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

  const posts = usePostListService(page, limit);

  const handlePostClick = (id: number) => {
    router.push(`${pathname}/${id}`);
  };

  if (posts.isLoading) return <TableRowsSkeletonComponent />;

  if (posts.isError) return <p className='text-center text-destructive py-4'>{posts.error.message}</p>;

  // return
  return <TableRowsComponent data={posts.data?.data} handleItemClickCallback={handlePostClick} />;
};

export default TableRowsDynamicComponent;
