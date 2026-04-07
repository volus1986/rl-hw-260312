import { type User } from '@supabase/auth-js';

import { userTokenStore, useUserStore } from '@/app/shared/store';
import { createClient } from '@/pkg/supabase/client';

interface IResponse {
  data: User | null;
  error: {
    message: string;
  };
}

export const userSignIn = async (email: string, password: string): Promise<IResponse> => {
  const supabaseClient = createClient();

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      data: null,
      error: {
        message: error.message,
      },
    };
  }

  if (data.session?.access_token && data.user) {
    userTokenStore.getState().setToken(data.session?.access_token);

    useUserStore.getState().setUser({
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata.name,
    });
  }

  return {
    data: data.user,
    error: {
      message: '',
    },
  };
};
