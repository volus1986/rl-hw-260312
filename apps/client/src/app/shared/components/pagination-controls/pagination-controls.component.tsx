import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Link } from '@/pkg/locale';
import { Button } from '@/pkg/shadcn';

// interface
interface IProps {
  page: number;
  totalPages: number;
  prevHref: string;
  nextHref: string;
}

// component
const PaginationControlsComponent: FC<Readonly<IProps>> = ({ page, totalPages, prevHref, nextHref }) => {
  const t = useTranslations('ItemsPage');

  // return
  return (
    <div className='mt-4 flex gap-1 justify-center'>
      {page <= 1 ? (
        <Button disabled>{t('prevNavButton')}</Button>
      ) : (
        <Button asChild>
          <Link href={prevHref} scroll={false}>
            {t('prevNavButton')}
          </Link>
        </Button>
      )}

      {page >= totalPages ? (
        <Button disabled>{t('nextNavButton')}</Button>
      ) : (
        <Button asChild>
          <Link href={nextHref} scroll={false}>
            {t('nextNavButton')}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PaginationControlsComponent;
