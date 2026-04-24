'use server';

import { createServiceClient } from '@/pkg/supabase/server';

// interface
interface ICreateUserProps {
  email: string;
  hashedPassword: string;
  name: string;
}

interface ICreateUserError {
  message: string;
}

// function
export const createUser = async ({ email, hashedPassword, name }: ICreateUserProps) => {
  const supabase = createServiceClient();

  const { data: existing } = await supabase.from('user_profiles').select('id').eq('email', email).single();

  if (existing) {
    return { user: null, error: { message: 'emailAlreadyTakenErrorMessage' } as ICreateUserError };
  }

  const { data: user, error } = await supabase
    .from('user_profiles')
    .insert({ email, password: hashedPassword, name })
    .select('id, email, name')
    .single();

  if (error || !user) {
    return { user: null, error: { message: 'registrationFailedErrorMessage' } as ICreateUserError };
  }

  return { user, error: null };
};
