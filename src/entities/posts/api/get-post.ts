import { Post } from "../model/post.type";
import { POSTS_URL } from "./constants";

export default async function getPost(id: number) {
  const res = await fetch(`${POSTS_URL}/${id}`);

  return (await res.json()) as Post;
}
