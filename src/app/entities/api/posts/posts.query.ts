import { envClient } from '@/config/env';
import { IPost } from '../../models';

const getPosts = async (page: number, limit: number) => {
  const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}?_page=${page}&_limit=${limit}`, {
    next: {
      revalidate: 3600,
    },
  });

  return (await res.json()) as IPost[];
};

export default getPosts;
