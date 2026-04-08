import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Link } from '@/pkg/locale';

// interface
interface IProps {}

// component
const MainComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('RootPage');

  // return
  return (
    <div className='flex flex-col items-center justify-center mt-80'>
      <div>
        <Link href={'items'}>{t('items')}</Link>
      </div>

      <div>
        <Link href={'sign'}>{t('login')}</Link>
      </div>
    </div>
  );
};

export default MainComponent;
