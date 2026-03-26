'use client';

import { useTranslations } from 'use-intl';

import { type PostDetails } from '@/app/entities/models';
import { Button, Table, TableBody, TableCell, TableRow } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

const ItemComponent = ({ item }: { item: PostDetails }) => {
  const router = useRouter();
  const t = useTranslations('ItemPage');

  const handlePreviousPageButtonClick = () => {
    router.back();
  };

  const rowEl = (title: string, value: number | string) => {
    return (
      <TableRow className='font-medium'>
        <TableCell>{title}</TableCell>
        <TableCell className='text-wrap'>{value}</TableCell>
      </TableRow>
    );
  };

  return (
    <div className='grid justify-center'>
      <div className='text-wrap'>
        <h1 className='text-center'>{t('title')}</h1>
        <Table>
          <TableBody>
            {rowEl(t('postId'), item.id)}
            {rowEl(t('postUserId'), item.userId)}
            {rowEl(t('postTitle'), item.title)}
            {rowEl(t('postDescription'), item.body)}
          </TableBody>
        </Table>

        <Button className='mt-8' onClick={handlePreviousPageButtonClick}>
          {t('previousPageButton')}
        </Button>
      </div>
    </div>
  );
};

export default ItemComponent;
