import { type FC } from 'react';

import { type TPostList } from '@/app/entities/models';
import { TableCell, TableRow } from '@/app/shared/ui';

interface IProps {
  data?: TPostList;
  isLoading?: boolean;
  skeletonRowsCount?: number;
  handleItemClickCallback: (id: number) => void;
}

const TableRowsComponent: FC<Readonly<IProps>> = (props) => {
  if (props.isLoading) {
    return Array.from({ length: props.skeletonRowsCount ?? 10 }).map((_, idx) => (
      <TableRow key={`skeleton-${idx}`} className='font-medium'>
        <TableCell>
          <div className='h-4 w-10 rounded bg-muted animate-pulse' />
        </TableCell>

        <TableCell>
          <div className='h-4 w-16 rounded bg-muted animate-pulse' />
        </TableCell>

        <TableCell>
          <div className='h-4 w-[70%] rounded bg-muted animate-pulse' />
        </TableCell>
      </TableRow>
    ));
  }

  if (!props.data) return null;

  const handleTableRowClick = (id: number) => {
    props.handleItemClickCallback(id);
  };

  return props.data.map((post) => {
    return (
      <TableRow key={post.id} className='font-medium cursor-pointer' onClick={() => handleTableRowClick(post.id)}>
        <TableCell>{post.id}</TableCell>
        <TableCell>{post.userId}</TableCell>
        <TableCell>{post.title}</TableCell>
      </TableRow>
    );
  });
};

export default TableRowsComponent;
