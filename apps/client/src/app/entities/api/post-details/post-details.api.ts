import { restApiFetcher } from '@/pkg/rest-api';

import { type IPostDetails } from '../../models';

interface IProps {
  id: number;
  signal?: AbortSignal | null;
}

export const getPostDetails = async ({ id, signal = null }: IProps) => {
  const res = await restApiFetcher.get<IPostDetails>(`posts/${id}`, { signal }).json();

  return res;
};
