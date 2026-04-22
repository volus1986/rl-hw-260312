import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPhotoDetails } from '@/app/entities/api';

// function
export const photoDetailsQueryOptions = (id: number) => {
  // return
  return queryOptions({
    queryKey: ['photoDetails', id],
    queryFn: ({ signal }) => getPhotoDetails({ id, signal }),
    staleTime: 60 * 60 * 1000,
  });
};

// function
export const usePhotoDetailsQuery = (id: number) => {
  // return
  return useQuery(photoDetailsQueryOptions(id));
};
