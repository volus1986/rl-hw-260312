'use client';

import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { usePostDetailsQuery } from '@/app/entities/api/post-details';
import { Button, Table, TableBody, TableCell, TableRow } from '@/app/shared/components';
import { useRouter } from '@/pkg/locale';

// interface
interface IProps {
  id: number;
}

// component
const ItemComponent: FC<Readonly<IProps>> = (props) => {
  const { id } = props;

  const router = useRouter();
  const t = useTranslations('ItemPage');
  const { data, isError } = usePostDetailsQuery(id);

  if (isError || !data?.id) {
    notFound();
  }

  const handlePreviousPageButtonClick = () => {
    router.back();
  };

  // return
  return (
    <div className='grid justify-center'>
      <div className='text-wrap'>
        <h1 className='text-center'>{t('title')}</h1>
        <Table>
          <TableBody>
            <TableRow className='font-medium'>
              <TableCell>{t('postId')}</TableCell>
              <TableCell className='text-wrap'>{data.id}</TableCell>
            </TableRow>

            <TableRow className='font-medium'>
              <TableCell>{t('postUserId')}</TableCell>
              <TableCell className='text-wrap'>{data.userId}</TableCell>
            </TableRow>

            <TableRow className='font-medium'>
              <TableCell>{t('postTitle')}</TableCell>
              <TableCell className='text-wrap'>{data.title}</TableCell>
            </TableRow>

            <TableRow className='font-medium'>
              <TableCell>{t('postDescription')}</TableCell>
              <TableCell className='text-wrap'>{data.body}</TableCell>
            </TableRow>
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
