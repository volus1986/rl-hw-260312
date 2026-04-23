'use client';

import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { useUserStore } from '@/app/shared/store';
import { Link, useRouter } from '@/pkg/locale';
import { Button } from '@/pkg/shadcn';
import { logout } from '@/pkg/supabase/entities';

//interface
interface IProps {}

// component
const SignButtonComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Header');
  const router = useRouter();

  const userStore = useUserStore();
  const isLoggedIn = !!userStore.user?.id;

  const handleLogoutButtonClick = async () => {
    await logout();
    userStore.clearUser();
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
