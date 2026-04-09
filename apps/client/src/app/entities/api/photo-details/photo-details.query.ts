import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPhotoDetails } from '@/app/entities/api';

export const photoDetailsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['photoDetails', id],
    queryFn: ({ signal }) => getPhotoDetails({ id, signal }),
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const usePhotoDetailsQuery = (id: number) => {
  return useQuery(photoDetailsQueryOptions(id));
};
