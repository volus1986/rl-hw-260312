import { cache } from "react";
import getPost from "./get-post";
import getPosts from "./get-posts";

export const postsApi = {
  getPosts,
  getPost: cache((id: number) => getPost(id)),
};
