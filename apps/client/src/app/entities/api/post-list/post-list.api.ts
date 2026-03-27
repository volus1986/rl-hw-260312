import { envClient } from '@/config/env';

import { type PostList } from '../../models';

type Props = {
  page: number;
  limit: number;
  signal: AbortSignal;
};

export const getPostList = async (props: Props) => {
  const { page, limit, signal } = props;

  console.log(page, limit, signal);

  const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}?_page=${page}&_limit=${limit}`, {
    next: {
      revalidate: 3600,
    },
    signal,
  });

  return (await res.json()) as PostList;
};
