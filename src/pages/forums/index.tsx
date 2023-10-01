import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import styles from "./index.module.scss";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { Post, Type, User } from "@/types";
import Link from "next/link";

function PostDisplay(props: Post) {
  const [author, setAuthor] = useState<User>();

  useEffect(() => {
    async function getAuthor() {
      const user = await getDoc(doc(db, "users/" + props.author));
      const data = user.data() as User;
      setAuthor(data);
    }

    getAuthor();
  }, []);

  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      href={"/forums/" + props.id}
    >
      <div
        className={styles.post}
        style={{
          borderRadius: "2",
          borderColor: "black",
          borderStyle: "solid",
        }}
      >
        <p style={{ float: "left", flex: 1 }}>{props.title}</p>
        <p style={{ right: 0 }}>@{author ? author.name : ""}</p>
      </div>
    </Link>
  );
}

export default function ForumsHome() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getData() {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        query(collection(db, "posts"), where("type", "==", Type.Forum))
      );

      const postsData: Post[] = [];

      querySnapshot.forEach((doc) => {
        const postData: Post = doc.data() as Post;
        postsData.push({ ...postData, id: doc.id });
      });

      setPosts(postsData);
    }

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <h1></h1>
        <h1 style={{ float: "left", flex: 1 }}>Welcome to the forums!</h1>
        <h2 style={{ right: 0 }}>
          <Link href="/forums/create" style={{ textDecoration: "none" }}>
            Join the Discussion!
          </Link>
        </h2>
      </div>
      <div className={styles.postContainer}>
        {posts.map((post) => (
          <PostDisplay {...post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
