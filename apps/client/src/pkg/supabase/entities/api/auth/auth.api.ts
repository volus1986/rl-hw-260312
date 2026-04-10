'use server';

import { jwtVerify } from 'jose';

import { createServiceClient } from '@/pkg/supabase/server';

function getJwtSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export const verifyBearerToken = async (authorizationHeader: string | null) => {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return {
      data: null,
      error: { message: 'Unauthorized' },
    };
  }

  const token = authorizationHeader.slice(7);

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
