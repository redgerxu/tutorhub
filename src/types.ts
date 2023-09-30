export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  title: string;
  content: string;
  upvotes: User[];
  downvotes: User[];
  author: string; // user id
}

export interface Comment {
  parent: Post;
  content: string;
}

export type Response = {
  message: string;
  error: string | undefined;
};
