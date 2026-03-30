import { envClient } from '@/config/env';

import { type TPostDetails } from '../../models';

type TProps = {
  id: number;
  signal?: AbortSignal | null;
};

export const getPostDetails = async ({ id, signal = null }: TProps) => {
  // const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}/${id}`, { cache: 'no-store' }); // Logic as homeWork requirements
  const res = await fetch(`${envClient.NEXT_PUBLIC_POSTS_API_URL}/${id}`, { signal, next: { revalidate: 3600 } }); // changes after the meet

  return (await res.json()) as TPostDetails;
};
