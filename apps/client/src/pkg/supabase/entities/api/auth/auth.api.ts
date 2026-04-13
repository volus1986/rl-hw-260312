'use server';

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { createServiceClient } from '@/pkg/supabase/server';

const AUTH_COOKIE = 'auth-token';

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const verifyBearerToken = async (authorizationHeader?: string | null) => {
  let token: string | null = null;

  if (authorizationHeader?.startsWith('Bearer ')) {
    token = authorizationHeader.slice(7);
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get(AUTH_COOKIE)?.value ?? null;
  }

  if (!token) {
    return {
      data: null,
      error: { message: 'Unauthorized' },
    };
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const userId = payload.sub as string;

    const supabase = createServiceClient();

    const { data: user, error } = await supabase
      .from('user_profiles')
      .select('id, email, name')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return {
        data: null,
        error: { message: 'User not found' },
      };
    }

    return {
      data: {
        id: user.id as string,
        email: user.email as string,
        name: user.name as string,
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: { message: 'Invalid or expired token' },
    };
  }
};
