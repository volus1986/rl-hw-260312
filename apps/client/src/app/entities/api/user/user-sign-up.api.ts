import { useUserStore } from '@/app/shared/store';
import { register } from '@/pkg/supabase/entities';
import { type TRegisterReq, type TUserRes } from '@/pkg/supabase/entities/dto';

// interface
interface IResponse {
  data: TUserRes | null;
  error: { message: string; seconds?: number } | null;
}

// function
export const userSignUp = async (props: Readonly<TRegisterReq>): Promise<IResponse> => {
  const { email, password, name } = props;

  const { data, error } = await register(email, password, name);

  if (error || !data) {
    // return
    return {
      data: null,
      error: { message: error?.message ?? 'registrationFailedErrorMessage', seconds: error?.seconds },
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
