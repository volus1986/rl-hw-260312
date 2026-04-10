import { userTokenStore, useUserStore } from '@/app/shared/store';
import { login } from '@/pkg/supabase/entities';

interface IResponse {
  data: {
    id: string;
    email: string;
    name: string;
  } | null;
  error: {
    message: string;
  } | null;
}

export const userSignIn = async (email: string, password: string): Promise<IResponse> => {
  const { data, error } = await login(email, password);

  if (error || !data) {
    return {
      data: null,
      error: { message: error?.message ?? 'Login failed' },
    };
  }

  userTokenStore.getState().setToken(data.token);

  useUserStore.getState().setUser({
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
  });

  return {
    data: data.user,
    error: null,
  };
};
