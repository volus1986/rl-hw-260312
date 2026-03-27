'use client';

import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { type TPostDetails } from '@/app/entities/models';
import { Button, Table, TableBody, TableCell, TableRow } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

interface IProps {
  item: TPostDetails;
}

const ItemComponent: FC<Readonly<IProps>> = (props) => {
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
            {rowEl(t('postId'), props.item.id)}
            {rowEl(t('postUserId'), props.item.userId)}
            {rowEl(t('postTitle'), props.item.title)}
            {rowEl(t('postDescription'), props.item.body)}
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
