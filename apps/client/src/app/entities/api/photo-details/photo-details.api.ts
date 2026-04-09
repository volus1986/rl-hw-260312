import { restApiFetcher } from '@/pkg/rest-api';

import { type IPhotoDetails } from '../../models';

interface IProps {
  id: number;
  signal?: AbortSignal | null;
}

export const getPhotoDetails = async ({ id, signal = null }: IProps) => {
  const res = await restApiFetcher.get<IPhotoDetails>(`photos/${id}`, { signal }).json();

  return res;
};
