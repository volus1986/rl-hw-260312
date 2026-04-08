interface IPost {
  id: number;
  userId: number;
  title: string;
}

export interface IPostList extends Array<IPost> {}
