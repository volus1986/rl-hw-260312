'use server';

import { createHash } from 'crypto';
import { SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';

import { type TRegisterRes } from '@/pkg/supabase/entities/dto';
import { createServiceClient } from '@/pkg/supabase/server';
import { rateLimit } from '@/pkg/supabase/utils/rate-limit';

// interface
interface IRegisterResponse {
  data: TRegisterRes | null;
  error: { message: string } | null;
}

// constant
const PASSWORD_SALT = '10';
const AUTH_COOKIE = 'auth-token';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const REGISTER_MAX_ATTEMPTS = 3;
const REGISTER_WINDOW_MS = 5 * 60 * 1000;

// function
function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + PASSWORD_SALT)
    .digest('hex');
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const register = async (email: string, password: string, name: string): Promise<IRegisterResponse> => {
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
      error: { message: `Too many registration attempts. Try again in ${seconds}s.` },
    };
  }

  const supabase = createServiceClient();

  const { data: existing } = await supabase.from('user_profiles').select('id').eq('email', email).single();

  if (existing) {
    // return
    return {
      data: null,
      error: { message: 'Email is already taken' },
    };
  }

  const hashedPassword = hashPassword(password);

  const { data: user, error } = await supabase
    .from('user_profiles')
    .insert({ email, password: hashedPassword, name })
    .select('id, email, name')
    .single();

  if (error || !user) {
    // return
    return {
      data: null,
      error: { message: error?.message ?? 'Registration failed' },
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
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_MAX_AGE,
  });

  // return
  return {
    data: {
      token,
      user: {
        id: user.id as string,
        email: user.email as string,
        name: user.name as string,
      },
    },
    error: null,
  };
};
