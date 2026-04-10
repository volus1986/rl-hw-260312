'use server';

import { createHash } from 'crypto';
import { SignJWT } from 'jose';

import { createServiceClient } from '@/pkg/supabase/server';

const PASSWORD_SALT = '10';

function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + PASSWORD_SALT)
    .digest('hex');
}

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const login = async (email: string, password: string) => {
  const supabase = createServiceClient();

  const { data: user, error } = await supabase
    .from('user_profiles')
    .select('id, email, name, password')
    .eq('email', email)
    .single();

  if (error || !user) {
    return {
      data: null,
      error: { message: 'Invalid credentials' },
    };
  }

  const hashedPassword = hashPassword(password);

  if (user.password !== hashedPassword) {
    return {
      data: null,
      error: { message: 'Invalid credentials' },
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
