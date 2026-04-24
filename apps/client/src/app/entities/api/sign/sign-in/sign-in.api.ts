'use server';

import { createHash } from 'crypto';
import { SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';

import { type TUserRes } from '@/app/entities/api/sign/dto';
import { envServer } from '@/config/env';
import { getUserByEmail } from '@/pkg/supabase/api';
import { rateLimit } from '@/pkg/supabase/utils/rate-limit';

// interface
interface IResponse {
  data: TUserRes | null;
  error: { message: string; seconds?: number } | null;
}

// constant
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 60 * 1000;

// function
function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + envServer.PASSWORD_SALT)
    .digest('hex');
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

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

  const token = await new SignJWT({ sub: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret());

  const cookieStore = await cookies();

  cookieStore.set(envServer.AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: envServer.TOKEN_MAX_AGE,
  });

  const userData: TUserRes = { id: user.id, email: user.email, name: user.name };

  // return
  return {
    data: userData,
    error: null,
  };
};
