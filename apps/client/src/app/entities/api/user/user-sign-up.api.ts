import { type User } from '@supabase/auth-js';

import { useUserStore } from '@/app/shared/store';
import { userTokenStore } from '@/app/shared/store/user-token.store';
import { createClient } from '@/app/shared/utils/supabase/client';

interface IResponse {
  data: User | null;
  error: {
    message: string;
  } | null;
}

interface IProps {
  email: string;
  password: string;
  name: string;
}

export const userSignUp = async (props: IProps): Promise<IResponse> => {
  const supabaseClient = createClient();

  const { data, error } = await supabaseClient.auth.signUp({
    email: props.email,
    password: props.password,
    options: {
      data: {
        name: props.name,
      },
    },
  });

  if (error) {
    return {
      data: null,
      error: {
        message: error.message,
      },
    };
  }

  // todo: as task requirements, remove after.
  console.log(data);
  if (data.session?.access_token) {
    userTokenStore.getState().setToken(data.session?.access_token);

    if (data.user) {
      useUserStore.getState().setUser({
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata.name,
      });
    }
  }

  return {
    data: data.user,
    error: {
      message: '',
    },
  };
};
