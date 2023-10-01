import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Create.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Categories, Post } from "@/types";
import { useRouter } from "next/router";
import { User } from "firebase/auth";

export default function Create() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Math");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  function escape(input: string) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\n/g, "<br>");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const tutorialsRef = collection(db, "tutorials");
      const newTutorial = {
        title: escape(title),
        content: escape(content),
        upvotes: [],
        downvotes: [],
        comments: [],
        author: currentUser.uid,
        category: selectedCategory as Categories,
      };

      await addDoc(tutorialsRef, newTutorial);
    } catch (error) {
      console.error("Error creating tutorial:", error);
    }
  };

  return (
    <div className={styles.supercontainer}>
      <div className={styles.container}>
        <h1>Create a Tutorial</h1>
        <form
          action="process_forum_creation.php"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label htmlFor="forum-title">Title:</label>
          <input
            type="text"
            id="forum-title"
            name="forum-title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <label htmlFor="forum-category">Category:</label>
          <select
            id="forum-category"
            name="forum-category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="forum-description">Body:</label>
          <textarea
            id="forum-description"
            name="forum-description"
            rows={5}
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
}
