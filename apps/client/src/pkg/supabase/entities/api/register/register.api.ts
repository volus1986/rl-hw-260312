'use server';

import { createHash } from 'crypto';
import { SignJWT } from 'jose';

import { createServiceClient } from '@/pkg/supabase/server';

const PASSWORD_SALT = '1234567890';

function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + PASSWORD_SALT)
    .digest('hex');
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const register = async (email: string, password: string, name: string) => {
  const supabase = createServiceClient();

  const { data: existing } = await supabase.from('user_profiles').select('id').eq('email', email).single();

  if (existing) {
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
