import { useUserStore } from '@/app/shared/store';
import { register } from '@/pkg/supabase/entities';

// interface
interface IProps {
  email: string;
  password: string;
  name: string;
}

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

// function
export const userSignUp = async (props: Readonly<IProps>): Promise<IResponse> => {
  const { email, password, name } = props;

  const { data, error } = await register(email, password, name);

  if (error || !data) {
    // return
    return {
      data: null,
      error: { message: error?.message ?? 'Registration failed' },
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
