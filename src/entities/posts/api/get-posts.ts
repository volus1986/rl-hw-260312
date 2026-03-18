import { Post } from "../model/post.type";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export default async function getPosts() {
  const res = await fetch(`${POSTS_URL}`);

  return (await res.json()) as Post[];
}
