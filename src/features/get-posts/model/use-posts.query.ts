"use client";

import { useQuery } from "@tanstack/react-query";

import { postsApi } from "@/entities/posts";

export function usePostsQuery() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
  });
}
