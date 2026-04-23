'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { usePhotoListQuery } from '@/app/entities/api/photo-list';
import { CardComponent } from '@/app/shared/components/card';

import { PAGINATION_PARAMS } from '../../items.constant';

// interface
interface IProps {}

// component
const ItemsListComponent: FC<Readonly<IProps>> = () => {
  const searchParams = useSearchParams();
  const t = useTranslations('ItemsPage');

  const page = Number(searchParams.get(PAGINATION_PARAMS.pageParamKey)) || PAGINATION_PARAMS.defaultPage;
  const limit = Number(searchParams.get(PAGINATION_PARAMS.limitParamKey)) || PAGINATION_PARAMS.defaultLimit;

  const photos = usePhotoListQuery(page, limit);

  if (photos.isError) {
    // return
    return <p className='text-center text-destructive py-4'>{photos.error.message}</p>;
  }

  const cards = photos.data?.data.map((photo) => (
    <CardComponent key={photo.id} id={photo.id} img={photo.thumbnailUrl} title={photo.title} />
  ));

  // return
  return (
    <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mb-4 space-y-4 text-center sm:mb-16 lg:mb-8'>
        <h1 className='text-2xl text-center'>{t('title')}</h1>
        <h2 className='text-2xl font-semibold'>{t('description')}</h2>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>{cards}</div>
    </section>
  );
};

export default ItemsListComponent;
