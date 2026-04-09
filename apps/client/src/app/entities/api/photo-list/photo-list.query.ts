import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPhotoList } from '@/app/entities/api';

export const photoListQueryOptions = (page: number, limit: number) => {
  return queryOptions({
    queryKey: ['photos', page, limit],
    queryFn: ({ signal }) => getPhotoList({ page, limit, signal }),
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const usePhotoListQuery = (page: number, limit: number) => {
  return useQuery(photoListQueryOptions(page, limit));
};
