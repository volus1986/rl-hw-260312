'use server';

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { SUserRes, type TUserRes } from '@/pkg/supabase/entities/dto';
import { createServiceClient } from '@/pkg/supabase/server';

const AUTH_COOKIE = 'auth-token';

// interface
interface IAuthResponse {
  data: TUserRes | null;
  error: { message: string } | null;
}

// function
function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const verifyBearerToken = async (authorizationHeader?: string | null): Promise<IAuthResponse> => {
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
      // return
      return {
        data: null,
        error: { message: 'User not found' },
      };
    }

    // return
    return {
      data: SUserRes.parse(user),
      error: null,
    };
  } catch {
    // return
    return {
      data: null,
      error: { message: 'Invalid or expired token' },
    };
  }
};
