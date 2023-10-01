export enum Categories {
  Science = "Science",
  Math = "Math",
  History = "History",
  English = "English",
  Other = "Other",
}

export enum Type {
  Tutorial = 0,
  Forum = 1,
  Comment = 2,
}

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
  comments: Comment[];
  category: Categories;
  id: string;
  type: Type;
}

export interface Comment {
  parent: Post;
  author: string;
  content: string;
  id: string;
}

export type Response = {
  message: string;
  error: string | undefined;
};
