import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPostList } from '@/app/entities/api';

export const postListQueryOptions = (page: number, limit: number) => {
  return queryOptions({
    queryKey: ['posts', page, limit],
    queryFn: ({ signal }) => getPostList({ page, limit, signal }),
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const usePostListQuery = (page: number, limit: number) => {
  return useQuery(postListQueryOptions(page, limit));
};
