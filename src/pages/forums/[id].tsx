import { db } from "@/firebase";
import { Post } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./id.module.scss";

export default function ForumPage() {
  const [data, setData] = useState<Post>();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
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

      setData(stuffs as Post);
    }

    getData();
  }, [params, router]);

  return <div className={styles.container}></div>;
}
