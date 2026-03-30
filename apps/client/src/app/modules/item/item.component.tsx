'use client';

import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { usePostDetailsService } from '@/app/features/get-post-details';
import { Button, Table, TableBody, TableCell, TableRow } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

interface IProps {
  id: number;
}

const ItemComponent: FC<Readonly<IProps>> = (props) => {
  const router = useRouter();
  const t = useTranslations('ItemPage');
  const { data, isError } = usePostDetailsService(props.id);

  if (isError || !data?.id) {
    notFound();
  }

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
            {rowEl(t('postId'), data.id)}
            {rowEl(t('postUserId'), data.userId)}
            {rowEl(t('postTitle'), data.title)}
            {rowEl(t('postDescription'), data.body)}
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
