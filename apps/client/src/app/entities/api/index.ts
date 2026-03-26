import { cache } from 'react';

import { getPostDetails } from './post-details';
import { getPosts } from './posts';

export const postsApi = {
  getPosts,
  getPostDetailsCached: cache((id: number) => getPostDetails(id)),
};

export { userSignIn } from './user';
