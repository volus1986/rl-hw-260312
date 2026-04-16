import { useUserStore } from '@/app/shared/store';
import { login } from '@/pkg/supabase/entities';
import { type TUserRes } from '@/pkg/supabase/entities/dto';

// interface
interface IResponse {
  data: TUserRes | null;
  error: { message: string; seconds?: number } | null;
}

// function
export const userSignIn = async (email: string, password: string): Promise<IResponse> => {
  const { data, error } = await login(email, password);

  if (error || !data) {
    // return
    return {
      data: null,
      error: { message: error?.message ?? 'loginFailedErrorMessage', seconds: error?.seconds },
    };
  }

  useUserStore.getState().setUser({
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
  });

  // return
  return {
    data: data.user,
    error: null,
  };
};
