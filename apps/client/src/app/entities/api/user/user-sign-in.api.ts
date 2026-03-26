import { IUser } from '@/app/shared/interfaces';

interface IResponseData extends IUser {
  token: string;
}

interface IResponse {
  data: IResponseData;
  error: {
    message: string;
  };
}

export const userSignIn = async (email: string, password: string): Promise<IResponse> => {
  // todo: add handler
  return await new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: {
            id: '1',
            email,
            name: 'Mocked User Name',
            token: Date.now().toString(),
          },
          error: {
            message: '',
          },
        }),
      2000,
    );
  });
};
