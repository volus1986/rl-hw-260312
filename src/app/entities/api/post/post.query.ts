import { envClient } from '@/config/env';

import { type IPost } from '../../models';

const getPost = async (id: number) => {
  const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}/${id}`, { cache: 'no-store' });

  return (await res.json()) as IPost;
};

export default getPost;
