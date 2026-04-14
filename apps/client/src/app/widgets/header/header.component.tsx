'use client';

import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Button, LanguageSwitcherComponent } from '@/app/shared/components';
import { ThemeSwitcherComponent } from '@/app/shared/components/theme-switcher';
import { Link } from '@/pkg/locale';

import { SignButtonComponent } from './elements/sign-button';
import { UserInfoComponent } from './elements/user-info';

const HeaderComponent: FC = () => {
  const t = useTranslations('Header');

  return (
    <header className='bg-background sticky top-0 z-50'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6'>
        <UserInfoComponent />

        <div className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
          <SignButtonComponent />

          <Link href='/items'>
            <Button variant='link' className='hover:text-primary max-md:hidden'>
              {t('items')}
            </Button>
          </Link>
        </div>

        <div className='flex items-center gap-6'>
          <LanguageSwitcherComponent />
          <ThemeSwitcherComponent />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
