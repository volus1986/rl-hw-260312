'use client';

import { useQuery } from '@tanstack/react-query';

import { getPostDetails } from '@/app/entities/api';

export const usePostDetailsService = (id: number) => {
  return useQuery({
    queryKey: ['postDetails', id],
    queryFn: ({ signal }) => getPostDetails({ id, signal }),
    staleTime: 60 * 60 * 1000,
  });
};
