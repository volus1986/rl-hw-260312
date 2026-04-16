'use server';

import { createHash } from 'crypto';
import { SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';

import { SLoginRes, type TLoginRes } from '@/pkg/supabase/entities/dto';
import { createServiceClient } from '@/pkg/supabase/server';
import { rateLimit } from '@/pkg/supabase/utils/rate-limit';

// interface
interface ILoginError {
  message: string;
  seconds?: number;
}

interface ILoginResponse {
  data: TLoginRes | null;
  error: ILoginError | null;
}

// constant
const PASSWORD_SALT = '10';
const AUTH_COOKIE = 'auth-token';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 60 * 1000;

// function
function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + PASSWORD_SALT)
    .digest('hex');
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
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

  const supabase = createServiceClient();

  const { data: user, error } = await supabase
    .from('user_profiles')
    .select('id, email, name, password')
    .eq('email', email)
    .single();

  if (error || !user) {
    return {
      data: null,
      error: { message: 'invalidCredentialsErrorMessage' },
    };
  }

  const hashedPassword = hashPassword(password);

  if (user.password !== hashedPassword) {
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

  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_MAX_AGE,
  });

  // return
  return {
    data: SLoginRes.parse({ token, user }),
    error: null,
  };
};
