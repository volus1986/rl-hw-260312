import { Post } from "../model/post.type";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export default async function getPost(id: number) {
  const res = await fetch(`${POSTS_URL}/${id}`);

  return (await res.json()) as Post;
}
