'use server';

import { headers } from 'next/headers';

import { SSignRes } from '@/app/entities/models';
import { IUserProfile } from '@/app/entities/models/user-profile.model';
import { createSession, hashPassword } from '@/app/shared/utils';
import { createUser } from '@/pkg/supabase/api';
import { rateLimit } from '@/pkg/supabase/utils/rate-limit';

// constant
const REGISTER_MAX_ATTEMPTS = 3;
const REGISTER_WINDOW_MS = 5 * 60 * 1000;

// interface
interface IProps {
  email: string;
  password: string;
  name: string;
}

interface IResponse {
  data: IUserProfile | null;
  error: { message: string; seconds?: number } | null;
}

// function
export const signUp = async (props: Readonly<IProps>): Promise<IResponse> => {
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

  await createSession(user.id, user.email);

  const userData = SSignRes.parse({ id: user.id, email: user.email, name: user.name });

  // return
  return {
    data: userData,
    error: null,
  };
};
