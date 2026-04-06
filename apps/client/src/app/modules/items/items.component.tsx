import { getTranslations } from 'next-intl/server';
import { type FC, Suspense } from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/app/shared/ui';

import { PaginationControlsComponent, TableRowsDynamicComponent, TableRowsSkeletonComponent } from './elements';

const ItemsComponent: FC = async () => {
  const t = await getTranslations('ItemsPage');

  return (
    <div className='grid justify-center'>
      <div className='w-[960]'>
        <h1 className='text-center'>{t('title')}</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-16'>ID</TableHead>
              <TableHead className='w-16'>User ID</TableHead>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <Suspense fallback={<TableRowsSkeletonComponent />}>
              <TableRowsDynamicComponent />
            </Suspense>
          </TableBody>
        </Table>

        <Suspense fallback={<div className='mt-4 h-10' />}>
          <PaginationControlsComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default ItemsComponent;
