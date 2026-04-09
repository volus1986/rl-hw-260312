'use client';

import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { usePhotoDetailsQuery } from '@/app/entities/api/photo-details';
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
  const { data, isError } = usePhotoDetailsQuery(id);

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
              <TableCell>{t('photoId')}</TableCell>
              <TableCell className='text-wrap'>{data.id}</TableCell>
            </TableRow>

            <TableRow className='font-medium'>
              <TableCell>{t('photoAlbumId')}</TableCell>
              <TableCell className='text-wrap'>{data.albumId}</TableCell>
            </TableRow>

            <TableRow className='font-medium'>
              <TableCell>{t('photoTitle')}</TableCell>
              <TableCell className='text-wrap'>{data.title}</TableCell>
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
