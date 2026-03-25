'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { usePostsQuery } from '@/app/features/get-posts';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/ui';
import { usePathname, useRouter } from '@/pkg/locale';
import { TableRowsComponent } from './elements';

const ItemsComponent = () => {
  const t = useTranslations('ItemsPage');

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;
  const pathname = usePathname();
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const posts = usePostsQuery(page, limit);

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
          <TableRowsComponent data={posts.data} handleItemClickCallback={handlePostClick} />
        </TableBody>
      </Table>

      <div className='mt-4 flex gap-1 justify-center'>
        <Button disabled={page <= 1} onClick={handlePrevButtonClick}>
          {t('prevNavButton')}
        </Button>
        <Button onClick={handleNextButtonClick}>{t('nextNavButton')}</Button>
      </div>
    </div>
  );
};

export default ItemsComponent;
