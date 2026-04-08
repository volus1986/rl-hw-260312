import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Button } from '@/app/shared/components';
import { userTokenStore, useUserStore } from '@/app/shared/store';
import { Link, useRouter } from '@/pkg/locale';

//interface
interface IProps {}

// component
const SignButtonComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Header');
  const router = useRouter();

  const userStore = useUserStore();
  const isLoggedIn = !!userStore.user?.id;

  const handleLogoutButtonClick = () => {
    userStore.clearUser();
    userTokenStore.getState().clearToken();

    router.push('/sign');
  };

  if (!isLoggedIn) {
    //return
    return (
      <Link href='/sign'>
        <Button variant='link' className='hover:text-primary max-md:hidden'>
          {t('login')}
        </Button>
      </Link>
    );
  }

  //return
  return (
    <Button variant='link' className='hover:text-primary max-md:hidden' onClick={handleLogoutButtonClick}>
      {t('logout')}
    </Button>
  );
};

export default SignButtonComponent;
