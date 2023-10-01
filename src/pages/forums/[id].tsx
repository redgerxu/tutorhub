import { auth, db } from "@/firebase";
import { Comment, Post, User as U } from "@/types";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./id.module.scss";
import { User } from "firebase/auth";

export default function ForumPage() {
  const [data, setData] = useState<Post>();
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const params = useParams();
  const router = useRouter();

  function handleCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (data) {
        const newComment = {
          parent: data,
          content: escape(comment),
          author: currentUser.email?.split("@")[0],
        };

        const parentRef = doc(db, "/posts/" + (params ? params["id"] : ""));

        const stuff = await getDoc(parentRef);

        const things = stuff.data() as Post;

        updateDoc(parentRef, { comments: [...things.comments, newComment] });
      }
    } catch (error) {
      console.error("Error creating tutorial:", error);
    }
  };

  function escape(input: string) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\n/g, "<br>");
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    });

    const id = params ? params["id"] : undefined;

    if (!id) {
      router.push("/forums");
    }

    async function getData() {
      const stuff = await getDoc(doc(db, "/posts/" + id));

      if (!stuff.exists) {
        router.replace("/404");
      }

      const stuffs = stuff.data();

      if (!stuffs) {
        router.replace("/404");
        console.error("Forum " + id + " not found");
      }

      const temp = stuffs as Post;
      setData(temp);
      const more = await getDoc(doc(db, "/users/" + temp.author));
      const data = more.data() as U;
      setAuthor(data.name);
    }

    getData();

    return () => {
      unsubscribe();
    };
  }, [params, router]);

  return (
    <div className={styles.container}>
      <div>
        <h1>{data?.title}</h1>
        <p>By @{author}</p>
        <br></br>
        <p dangerouslySetInnerHTML={{ __html: data?.content ?? "" }} />
      </div>
      <form
        action="process_forum_creation.php"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <textarea
          id="forum-description"
          name="forum-description"
          rows={2}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comment here"
          required
        ></textarea>
        <input type="submit" value="Comment" />
      </form>

      <h2>Comments</h2>
      {data?.comments.map((comment, index) => (
        <div className={styles.comment} key={index}>
          <h3>{comment.author}</h3>
          {comment.content}
        </div>
      ))}
    </div>
  );
}
