import { cache } from 'react';
import { getPost } from './post';
import { getPosts } from './posts';

export const postsApi = {
  getPosts,
  getPostCached: cache((id: number) => getPost(id)),
};
