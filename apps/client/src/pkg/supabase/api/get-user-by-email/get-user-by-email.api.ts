'use server';

import { createServiceClient } from '@/pkg/supabase/server';

export const getUserByEmail = async (email: string) => {
  const supabase = createServiceClient();

  const { data: user, error } = await supabase
    .from('user_profiles')
    .select('id, email, name, password')
    .eq('email', email)
    .single();

  return { user, error };
};
