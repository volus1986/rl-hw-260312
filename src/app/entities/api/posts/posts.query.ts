import { Post } from "../../models";

export const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(page: number, limit: number) {
  const res = await fetch(`${POSTS_URL}?_page=${page}&_limit=${limit}`, {
    next: {
      revalidate: 3600,
    },
  });

  return (await res.json()) as Post[];
}

export async function getPost(id: number) {
  const res = await fetch(`${POSTS_URL}/${id}`, { cache: "no-store" });

  return (await res.json()) as Post;
}
