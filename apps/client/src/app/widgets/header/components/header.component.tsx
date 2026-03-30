'use client';

import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { LanguageSwitcherComponent } from '@/app/features/language-switcher';
import { userTokenStore, useUserStore } from '@/app/shared/store';
import { Button } from '@/app/shared/ui';
import { Link, useRouter } from '@/pkg/locale';

const HeaderComponent: FC = () => {
  const t = useTranslations('Header');
  const router = useRouter();

  const userStore = useUserStore();
  const isLoggedIn = !!userStore.user?.id;

  const signButton = () => {
    const handleLogoutButtonClick = () => {
      userStore.clearUser();
      userTokenStore.getState().clearToken();

      router.push('/sign');
    };

    if (!isLoggedIn) {
      return (
        <Link href='/sign'>
          <Button variant='link' className='hover:text-primary max-md:hidden'>
            {t('login')}
          </Button>
        </Link>
      );
    }

    return (
      <Button variant='link' className='hover:text-primary max-md:hidden' onClick={handleLogoutButtonClick}>
        {t('logout')}
      </Button>
    );
  };

  return (
    <header className='bg-background sticky top-0 z-50'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6'>
        <div className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
          <Link href='/items'>
            <Button variant='link' className='hover:text-primary max-md:hidden'>
              {t('items')}
            </Button>
          </Link>

          {signButton()}
        </div>

        <div className='flex items-center gap-6'>
          <LanguageSwitcherComponent />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
