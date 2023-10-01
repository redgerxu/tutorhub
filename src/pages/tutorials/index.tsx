import { Categories, Post, User } from "@/types";
import styles from "./index.module.scss";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "@/firebase";
import Link from "next/link";
import Cookies from "js-cookie";

function Post(props: Post) {
  const [author, setAuthor] = useState<User>();

  useEffect(() => {
    async function getData() {
      const user = await getDoc(doc(db, "users/" + props.author));
      const data = user.data() as User;
      setAuthor(data);
    }

    getData();
  }, []);

  return (
    <Link
      href={"/tutorials/" + props.id}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.post}>
        <h3>{props.title}</h3>
        <p>
          {props.content.length > 42
            ? props.content.slice(0, 42) + "..."
            : props.content}
        </p>
        {author ? (
          <div className={styles.bottomleft}>{author.name}</div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}

function Section({ title, posts }: { title: string; posts: Post[] }) {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.postContainer}>
        {posts.map((post, index) => (
          <Post {...post} key={index} />
        ))}
      </div>
    </div>
  );
}

export default function TutorialHome() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [sciencePosts, setSciencePosts] = useState<Post[]>([]);
  const [mathPosts, setMathPosts] = useState<Post[]>([]);
  const [historyPosts, setHistoryPosts] = useState<Post[]>([]);
  const [englishPosts, setEnglishPosts] = useState<Post[]>([]);
  const [otherPosts, setOtherPosts] = useState<Post[]>([]);

  const fetchPostsByCategory = async (
    category: string,
    setStateFunction: Dispatch<SetStateAction<Post[]>>
  ) => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        query(collection(db, "posts"), where("category", "==", category))
      );

      const postsData: Post[] = [];

      querySnapshot.forEach((doc) => {
        const postData: Post = doc.data() as Post;
        postsData.push(postData);
      });

      setStateFunction(postsData);
    } catch (error) {
      console.error(`Error fetching ${category} posts: `, error);
    }
  };

  // Fetch recent posts based on IDs
  const fetchRecentPosts = async (recentPostIds: string[]) => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        query(collection(db, "posts"), where("id", "in", recentPostIds))
      );

      const recentPostsData: Post[] = [];

      querySnapshot.forEach((doc) => {
        const postData: Post = doc.data() as Post;
        recentPostsData.push(postData);
      });

      setRecentPosts(recentPostsData);
    } catch (error) {
      console.error("Error fetching recent posts: ", error);
    }
  };

  useEffect(() => {
    const recentPostIds: string[] = JSON.parse(
      Cookies.get("recentPostIds") ?? "[]"
    );

    fetchRecentPosts(recentPostIds);
    fetchPostsByCategory(Categories.Science, setSciencePosts);
    fetchPostsByCategory(Categories.Math, setMathPosts);
    fetchPostsByCategory(Categories.History, setHistoryPosts);
    fetchPostsByCategory(Categories.English, setEnglishPosts);
    fetchPostsByCategory(Categories.Other, setOtherPosts);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Tutorials For You</h1>
      <Section title="Recently Viewed" posts={recentPosts} />
      <Section title={Categories.Science} posts={sciencePosts} />
      <Section title={Categories.Math} posts={mathPosts} />
      <Section title={Categories.History} posts={historyPosts} />
      <Section title={Categories.English} posts={englishPosts} />
      <Section title={Categories.Other} posts={otherPosts} />
    </div>
  );
}
