import { type User } from '@supabase/auth-js';

import { useUserStore } from '@/app/shared/store';
import { userTokenStore } from '@/app/shared/store/user-token.store';
import { createClient } from '@/pkg/supabase/client';

// interface
interface IResponse {
  data: User | null;
  error: {
    message: string;
  } | null;
}

// interface
interface IProps {
  email: string;
  password: string;
  name: string;
}

// function
export const userSignUp = async (props: Readonly<IProps>): Promise<IResponse> => {
  const { email, password, name } = props;

  const supabaseClient = createClient();

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) {
    // return
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

  // return
  return {
    data: data.user,
    error: {
      message: '',
    },
  };
};
