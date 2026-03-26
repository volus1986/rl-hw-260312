import { cache } from 'react';

import { getPostDetails } from './post-details';
import { getPostList } from './post-list';

export const postsApi = {
  getPostList,
  getPostDetailsCached: cache((id: number) => getPostDetails(id)),
};

export { userSignIn } from './user';
