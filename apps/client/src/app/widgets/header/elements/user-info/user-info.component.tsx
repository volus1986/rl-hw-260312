'use client';

import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { useUserStore } from '@/app/shared/store';

// interface
interface IProps {}

// component
const UserInfoComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('Header');
  const userStore = useUserStore();

  const user = userStore.user;

  if (!user) {
    // return
    return null;
  }

  // return
  return <div>{t('userInfoGreeting', { name: user.name })}</div>;
};

export default UserInfoComponent;
