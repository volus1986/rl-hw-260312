import { type FC } from 'react';

import { Skeleton, TableCell, TableRow } from '@/app/shared/ui';

const SKELETON_ROWS_COUNT = 10;

const TableRowsSkeletonComponent: FC = () => {
  return Array.from({ length: SKELETON_ROWS_COUNT }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className='h-4 w-8' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-8' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-4 w-full' />
      </TableCell>
    </TableRow>
  ));
};

export default TableRowsSkeletonComponent;
