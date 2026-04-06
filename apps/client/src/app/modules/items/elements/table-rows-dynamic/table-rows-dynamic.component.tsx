'use client';

import { useSearchParams } from 'next/navigation';
import { type FC } from 'react';

import { usePostListService } from '@/app/features/get-post-list';
import { usePathname, useRouter } from '@/pkg/locale';

import { PAGINATION_PARAMS } from '../../items.constant';
import { TableRowsComponent } from '../table-rows';
import { TableRowsSkeletonComponent } from '../table-rows-skeleton';

const TableRowsDynamicComponent: FC = () => {
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

  return <TableRowsComponent data={posts.data} handleItemClickCallback={handlePostClick} />;
};

export default TableRowsDynamicComponent;
