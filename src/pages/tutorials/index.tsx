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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link
      href={"/tutorials/" + props.id}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.post}>
        <h3>{props.title}</h3>
        <p>
          {(props.content ?? "").length > 42
            ? props.content.slice(0, 42) + "..."
            : props.content}
        </p>
        {author ? (
          <div className={styles.bottomleft}>By {author.name}</div>
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
        query(collection(db, "tutorials"), where("category", "==", category))
      );

      const postsData: Post[] = [];

      querySnapshot.forEach((doc) => {
        const postData: Post = doc.data() as Post;
        postsData.push({ ...postData, id: doc.id });
      });

      setStateFunction(postsData);
    } catch (error) {
      console.error(`Error fetching ${category} posts: `, error);
    }
  };

  function fetchRecentPosts(recentPostIds: string[]) {
    if (recentPostIds.length === 0) {
      return;
    }

    const postRefs = recentPostIds.map((postId) =>
      doc(db, "tutorials", postId)
    );

    postRefs.forEach(async (ref) => {
      const stuffs = await getDoc(ref);
      const postData: Post = stuffs.data() as Post;
      setRecentPosts([...recentPosts, { ...postData, id: ref.id }]);
    });
  }

  useEffect(() => {
    const recentPostIds: string[] = JSON.parse(
      Cookies.get("recentPostIds") ?? "[]"
    );

    async function fetchStuff() {
      await fetchRecentPosts(recentPostIds);

      await fetchPostsByCategory(Categories.Science, setSciencePosts);

      await fetchPostsByCategory(Categories.Math, setMathPosts);

      await fetchPostsByCategory(Categories.History, setHistoryPosts);

      await fetchPostsByCategory(Categories.English, setEnglishPosts);

      await fetchPostsByCategory(Categories.Other, setOtherPosts);
    }

    fetchStuff();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{ float: "left", flex: 1 }}>Tutorials For You</h1>
        <h2 style={{ right: 0 }}>
          <Link href="/tutorials/create" style={{ textDecoration: "none" }}>
            Create Your Own
          </Link>
        </h2>
      </div>
      <Section title="Recently Viewed" posts={recentPosts} />
      <Section title={Categories.Science} posts={sciencePosts} />
      <Section title={Categories.Math} posts={mathPosts} />
      <Section title={Categories.History} posts={historyPosts} />
      <Section title={Categories.English} posts={englishPosts} />
      <Section title={Categories.Other} posts={otherPosts} />
    </div>
  );
}
