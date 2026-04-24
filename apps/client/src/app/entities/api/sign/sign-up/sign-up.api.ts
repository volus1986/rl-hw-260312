'use server';

import { createHash } from 'crypto';
import { SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';

import { envServer } from '@/config/env';
import { createUser } from '@/pkg/supabase/api';
import { type TUserRes } from '@/app/entities/api/sign/dto';
import { rateLimit } from '@/pkg/supabase/utils/rate-limit';

import { type TRegisterReq } from '../dto/sign-up.dto';

// interface
interface IResponse {
  data: TUserRes | null;
  error: { message: string; seconds?: number } | null;
}

// constant
const REGISTER_MAX_ATTEMPTS = 3;
const REGISTER_WINDOW_MS = 5 * 60 * 1000;

// function
function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + envServer.PASSWORD_SALT)
    .digest('hex');
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const signUp = async (props: Readonly<TRegisterReq>): Promise<IResponse> => {
  const { email, password, name } = props;

  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for') ?? headerStore.get('x-real-ip') ?? '127.0.0.1';

  const { limited, retryAfterMs } = rateLimit({
    key: `register:${ip}`,
    maxAttempts: REGISTER_MAX_ATTEMPTS,
    windowMs: REGISTER_WINDOW_MS,
  });

  if (limited) {
    const seconds = Math.ceil(retryAfterMs / 1000);

    // return
    return {
      data: null,
      error: { message: 'tooManyRegistrationAttemptsErrorMessage', seconds },
    };
  }

  const { user, error } = await createUser({ email, hashedPassword: hashPassword(password), name });

  if (error || !user) {
    // return
    return {
      data: null,
      error: { message: error?.message ?? 'registrationFailedErrorMessage' },
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

  // return
  return {
    data: { id: user.id, email: user.email, name: user.name },
    error: null,
  };
};
