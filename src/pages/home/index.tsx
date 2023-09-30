import { Post, User } from "@/types";
import styles from "./index.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase";

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
    <div className={styles.post}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      {author ? <div className={styles.bottomleft}>{author.name}</div> : <></>}
    </div>
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

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello world!</h1>
      <Section
        title="Recent"
        posts={[
          {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
            upvotes: [],
            downvotes: [],
            author: "w3T2QCTShdgRS93IGwOtkku8V1F3",
          },
        ]}
      />
    </div>
  );
}
