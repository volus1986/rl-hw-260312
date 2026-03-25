import { IPost } from '@/app/entities/models';
import { TableCell, TableRow } from '@/app/shared/ui';

interface IProps {
  data?: IPost[];
  handleItemClickCallback: (id: number) => void;
}

const TableRowsComponent = ({ data, handleItemClickCallback }: IProps) => {
  if (!data) return null;

  return data.map((post) => {
    return (
      <TableRow key={post.id} className='font-medium cursor-pointer' onClick={() => handleItemClickCallback(post.id)}>
        <TableCell>{post.id}</TableCell>
        <TableCell>{post.userId}</TableCell>
        <TableCell>{post.title}</TableCell>
      </TableRow>
    );
  });
};

export default TableRowsComponent;
