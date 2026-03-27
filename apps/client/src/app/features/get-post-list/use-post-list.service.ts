'use client';

import { useQuery } from '@tanstack/react-query';

import { getPostList } from '@/app/entities/api';

export const usePostListService = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: ({ signal }) => getPostList({ page, limit, signal }),
    staleTime: 60 * 60 * 1000,
  });
};
