import { useTranslations } from 'next-intl';

import { Link } from '@/pkg/locale';

const MainComponent = () => {
  const t = useTranslations('RootPage');

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
