import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPostDetails } from '@/app/entities/api';

export const postDetailsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['postDetails', id],
    queryFn: ({ signal }) => getPostDetails({ id, signal }),
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const usePostDetailsQuery = (id: number) => {
  return useQuery(postDetailsQueryOptions(id));
};
