import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPhotoList } from './photo-list.api';

// function
export const photoListQueryOptions = (page: number, limit: number) => {
  return queryOptions({
    queryKey: ['photos', page, limit],
    queryFn: ({ signal }) => getPhotoList({ page, limit, signal }),
    staleTime: 60 * 60 * 1000,
  });
};

// function
export const usePhotoListQuery = (page: number, limit: number) => {
  // return
  return useQuery(photoListQueryOptions(page, limit));
};
