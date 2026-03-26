import { type PostList } from '@/app/entities/models';
import { TableCell, TableRow } from '@/app/shared/ui';

interface IProps {
  data?: PostList;
  isLoading?: boolean;
  skeletonRowsCount?: number;
  handleItemClickCallback: (id: number) => void;
}

const TableRowsComponent = ({ data, isLoading, skeletonRowsCount = 10, handleItemClickCallback }: IProps) => {
  if (isLoading) {
    return Array.from({ length: skeletonRowsCount }).map((_, idx) => (
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

  if (!data) return null;

  const handleTableRowClick = (id: number) => {
    handleItemClickCallback(id);
  };

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
