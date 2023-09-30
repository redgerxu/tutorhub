export interface User {
  id: string;
  name: string;
}

export interface Post {
  Title: string;
  Content: string;
  Upvotes: User[];
  Downvotes: User[];
}

export interface Comment {
  Parent: Post;
  Content: string;
}

export type Response = {
  message: string;
  error: string | undefined;
};
