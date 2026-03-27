import { envClient } from '@/config/env';

import { type TPostList } from '../../models';

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

  return (await res.json()) as TPostList;
};
