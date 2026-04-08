import { restApiFetcher } from '@/pkg/rest-api';

import { type IPostList } from '../../models';

interface IProps {
  page: number;
  limit: number;
  signal: AbortSignal;
}

export const getPostList = async (props: IProps) => {
  const { page, limit, signal } = props;

  const res = await restApiFetcher
    .get<IPostList>(`posts?_page=${page}&_limit=${limit}`, {
      signal,
    })
    .json();

  return {
    data: res,
    meta: { total_results: 100 }, // todo:  mocked data because jsonplaceholder API has no data about the pagination items amount
  };
};
