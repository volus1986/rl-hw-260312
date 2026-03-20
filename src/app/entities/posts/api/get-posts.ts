import { Post } from "../model/post.type";
import { POSTS_URL } from "./constants";

export default async function getPosts(page: number, limit: number) {
  const res = await fetch(`${POSTS_URL}?_page=${page}&_limit=${limit}`, {
    next: {
      revalidate: 3600,
    },
  });

  return (await res.json()) as Post[];
}
