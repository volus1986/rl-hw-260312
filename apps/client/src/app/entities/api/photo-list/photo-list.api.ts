import { restApiFetcher } from '@/pkg/rest-api';

import { type IPhotoList } from '../../models';

// interface
interface IProps {
  page: number;
  limit: number;
  signal: AbortSignal;
}

// function
export const getPhotoList = async (props: IProps) => {
  const { page, limit, signal } = props;

  const res = await restApiFetcher
    .get<IPhotoList>(`photos?_page=${page}&_limit=${limit}`, {
      signal,
      next: { revalidate: 3600 },
    })
    .json();

  // return
  return {
    data: res,
    meta: { total_results: 5000 }, // mocked data because jsonplaceholder API has no data about the pagination items amount
  };
};
