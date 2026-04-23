import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { useRouter } from '@/pkg/locale';
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
  const router = useRouter();

  // return
  return (
    <div className='mt-4 flex gap-1 justify-center'>
      <Button disabled={page <= 1} onClick={() => router.push(prevHref, { scroll: false })}>
        {t('prevNavButton')}
      </Button>

      <Button disabled={page >= totalPages} onClick={() => router.push(nextHref, { scroll: false })}>
        {t('nextNavButton')}
      </Button>
    </div>
  );
};

export default PaginationControlsComponent;
