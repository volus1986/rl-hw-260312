import { type FC } from 'react';

import { type TPostList } from '@/app/entities/models';
import { TableCell, TableRow } from '@/app/shared/ui';

interface IProps {
  data?: TPostList;
  handleItemClickCallback: (id: number) => void;
}

const TableRowsComponent: FC<Readonly<IProps>> = (props) => {
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
