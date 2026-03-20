import { cache } from "react";
import { getPosts, getPost } from "./posts/posts.query";

export const postsApi = {
  getPosts,
  getPostCached: cache((id: number) => getPost(id)),
};
