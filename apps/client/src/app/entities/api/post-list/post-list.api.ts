import { envClient } from '@/config/env';

import { type IPostList } from '../../models';

type TProps = {
  page: number;
  limit: number;
  signal: AbortSignal;
};

export const getPostList = async (props: TProps) => {
  const { page, limit, signal } = props;

  const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}?_page=${page}&_limit=${limit}`, {
    next: {
      revalidate: 3600,
    },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  return {
    data: (await res.json()) as IPostList,
    meta: { total_results: 100 }, // mocked data because jsonplaceholder API has no data about the pagination items amount
  };
};
