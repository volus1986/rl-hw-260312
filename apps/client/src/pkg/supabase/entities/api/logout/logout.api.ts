'use server';

import { cookies } from 'next/headers';

import { envServer } from '@/config/env';

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(envServer.AUTH_COOKIE);
};
