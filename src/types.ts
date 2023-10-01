export enum Categories {
  Science = "Science",
  Math = "Math",
  History = "History",
  English = "English",
  Other = "Other",
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
  comments: string[];
  category: Categories;
  id: string;
}

export interface Comment {
  parent: Post;
  content: string;
  id: string;
}

export type Response = {
  message: string;
  error: string | undefined;
};
