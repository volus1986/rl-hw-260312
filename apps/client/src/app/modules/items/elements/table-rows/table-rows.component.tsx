import { type FC } from 'react';

import { type IPhotoList } from '@/app/entities/models';
import { TableCell, TableRow } from '@/app/shared/components';

// interface
interface IProps {
  data?: IPhotoList;
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
  return data.map((photo) => {
    return (
      <TableRow key={photo.id} className='font-medium cursor-pointer' onClick={() => handleTableRowClick(photo.id)}>
        <TableCell>{photo.id}</TableCell>
        <TableCell>{photo.albumId}</TableCell>
        <TableCell>{photo.title}</TableCell>
      </TableRow>
    );
  });
};

export default TableRowsComponent;
