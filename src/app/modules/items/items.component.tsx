'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { usePostsQuery } from '@/app/features/get-posts';
import { Button, Table, TableBody, TableHead, TableHeader, TableRow } from '@/app/shared/ui';
import { usePathname, useRouter } from '@/pkg/locale';
import { TableRowsComponent } from './elements';

const ItemsComponent = () => {
  const t = useTranslations('ItemsPage');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const showItemsLimit = Number(searchParams.get('limit')) || 20;
  const pages = Math.floor(100 / showItemsLimit); //  API has not data about the pagination

  const posts = usePostsQuery(page, showItemsLimit);
  const isInitialLoading = posts.isLoading;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const handlePrevButtonClick = () => {
    replace(createPageURL(page - 1), { scroll: false });
  };

  const handleNextButtonClick = () => {
    replace(createPageURL(page + 1), { scroll: false });
  };

  const handlePostClick = (id: number) => {
    router.push(`${pathname}/${id}`);
  };

  return (
    <div>
      <h1 className='text-center'>{t('title')}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRowsComponent
            data={posts.data}
            isLoading={isInitialLoading}
            skeletonRowsCount={showItemsLimit}
            handleItemClickCallback={handlePostClick}
          />
        </TableBody>
      </Table>

      <div className='mt-4 flex gap-1 justify-center'>
        <Button disabled={page <= 1} onClick={handlePrevButtonClick}>
          {t('prevNavButton')}
        </Button>

        <Button disabled={page >= pages} onClick={handleNextButtonClick}>
          {t('nextNavButton')}
        </Button>
      </div>
    </div>
  );
};

export default ItemsComponent;
