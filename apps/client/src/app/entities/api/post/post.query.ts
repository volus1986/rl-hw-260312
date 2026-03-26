import { envClient } from '@/config/env';

import { type IPost } from '../../models';

const getPost = async (id: number) => {
  // const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}/${id}`, { cache: 'no-store' }); // Logic as homeWork requirements
  const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}/${id}`, { next: { revalidate: 3600 } }); // changes after the meet

  return (await res.json()) as IPost;
};

export default getPost;
