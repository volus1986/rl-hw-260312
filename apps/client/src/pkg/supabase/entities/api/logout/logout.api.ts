'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE = 'auth-token';

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
};
