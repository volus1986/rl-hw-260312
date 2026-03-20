"use client";

import { useQuery } from "@tanstack/react-query";

import { postsApi } from "@/app/entities/api";

export function usePostsQuery(page: number, limit: number) {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => postsApi.getPosts(page, limit),
    staleTime: 60 * 60 * 1000,
  });
}
