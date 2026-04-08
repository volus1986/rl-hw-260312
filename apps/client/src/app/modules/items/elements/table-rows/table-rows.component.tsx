import { type FC } from 'react';

import { type TPostList } from '@/app/entities/models';
import { TableCell, TableRow } from '@/app/shared/components';

// interface
interface IProps {
  data?: TPostList;
  handleItemClickCallback: (id: number) => void;
}

// component
const TableRowsComponent: FC<Readonly<IProps>> = (props) => {
  const { data, handleItemClickCallback } = props;

  if (!data) return null;

  const handleTableRowClick = (id: number) => {
    handleItemClickCallback(id);
  };

  // return
  return data.map((post) => {
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
