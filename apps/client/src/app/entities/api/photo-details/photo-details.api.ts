import { restApiFetcher } from '@/pkg/rest-api';

import { type IPhotoDetails } from '../../models';

// interface
interface IProps {
  id: number;
  signal?: AbortSignal | null;
}

// function
export const getPhotoDetails = async ({ id, signal = null }: IProps) => {
  const res = await restApiFetcher
    .get<IPhotoDetails>(`photos/${id}`, {
      signal,
      cache: 'force-cache',
      next: { revalidate: 3600 },
    })
    .json();

  // return
  return res;
};
