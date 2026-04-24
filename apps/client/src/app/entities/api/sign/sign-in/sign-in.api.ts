'use server';

import { headers } from 'next/headers';

import { createSession, hashPassword } from '@/app/shared/utils';
import { getUserByEmail } from '@/pkg/supabase/api';
import { rateLimit } from '@/pkg/supabase/utils/rate-limit';

import { SSignInRes, TSignInRes } from './sign-in.dto';

// interface
interface IResponse {
  data: TSignInRes | null;
  error: { message: string; seconds?: number } | null;
}

// constant
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 60 * 1000;

// function
export const signIn = async (email: string, password: string): Promise<IResponse> => {
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for') ?? headerStore.get('x-real-ip') ?? '127.0.0.1';

  const { limited, retryAfterMs } = rateLimit({
    key: `login:${ip}`,
    maxAttempts: LOGIN_MAX_ATTEMPTS,
    windowMs: LOGIN_WINDOW_MS,
  });

  if (limited) {
    const seconds = Math.ceil(retryAfterMs / 1000);

    // return
    return {
      data: null,
      error: { message: 'tooManyAttemptsErrorMessage', seconds },
    };
  }

  const { user, error } = await getUserByEmail(email);

  if (error || !user || user.password !== hashPassword(password)) {
    // return
    return {
      data: null,
      error: { message: 'invalidCredentialsErrorMessage' },
    };
  }

  await createSession(user.id, user.email);

  const userData = SSignInRes.parse({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  // return
  return {
    data: userData,
    error: null,
  };
};
