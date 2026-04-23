'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';

import { usePhotoDetailsQuery } from '@/app/entities/api/photo-details';
import NoImageSvg from '@/app/shared/assets/svg/no-image.svg';
import { Button } from '@/app/shared/components';
import { Link, useRouter } from '@/pkg/locale';
import { Card, CardContent } from '@/pkg/shadcn/ui/components/card';

// interface
interface IProps {
  id: number;
}

// component
const ItemComponent: FC<Readonly<IProps>> = (props) => {
  const { id } = props;
  const [imgError, setImgError] = useState(false);

  const router = useRouter();
  const t = useTranslations('ItemPage');
  const { data } = usePhotoDetailsQuery(id);

  if (!data?.id) {
    return null;
  }

  const handlePreviousPageButtonClick = () => {
    router.back();
  };

  // return
  return (
    <div className='grid justify-center'>
      <div className='text-wrap'>
        <h1 className='text-center text-2xl'>{t('title')}</h1>
      </div>

      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <Card className='shadow-none'>
            <CardContent>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                <Card className='bg-muted rounded-lg border-0 shadow-none'>
                  <CardContent className='flex h-full flex-col justify-between gap-4'>
                    <h2 className='text-xl leading-tight font-semibold lg:text-2xl'>{data.title}</h2>

                    <div>
                      <p className='text-muted-foreground mb-3 text-base'>
                        {t('photoId')}: {data.id}
                      </p>

                      <p className='text-muted-foreground mb-3 text-base'>
                        {t('photoAlbumId')}: {data.albumId}
                      </p>

                      <Button variant='link' className='p-0 mb-3'>
                        <Link href={data.url} target='_blank'>
                          {t('openSourceButton')}
                        </Link>
                      </Button>
                    </div>

                    <Button className='mt-8' onClick={handlePreviousPageButtonClick}>
                      {t('previousPageButton')}
                    </Button>
                  </CardContent>
                </Card>

                <div className='relative h-64 sm:h-80 lg:h-auto rounded-lg overflow-hidden'>
                  {imgError ? (
                    <div className='flex aspect-video w-full h-full items-center justify-center bg-muted'>
                      <NoImageSvg className='h-16 w-16 text-muted-foreground' />
                    </div>
                  ) : (
                    <Image
                      fill
                      src={data.url}
                      alt={data.title}
                      className='h-full w-full object-cover'
                      onError={() => setImgError(true)}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ItemComponent;
