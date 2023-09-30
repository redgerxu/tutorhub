export interface User {
  id: string;
  name: string;
}

export interface Post {
  title: string;
  content: string;
  upvotes: User[];
  downvotes: User[];
}

export interface Comment {
  parent: Post;
  content: string;
}

export type Response = {
  message: string;
  error: string | undefined;
};
