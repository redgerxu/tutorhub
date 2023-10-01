import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import styles from "./id.module.scss";
import { Post } from "@/types";
import Cookies from "js-cookie";

export default function TutorialView() {
  const [data, setData] = useState<Post>();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const id = params ? params["id"] : undefined;

    if (!id) {
      router.push("/tutorials");
      return;
    }

    async function getData() {
      const tutorialDoc = await getDoc(doc(db, "/tutorials/" + id));

      if (!tutorialDoc.exists()) {
        return;
      }

      const tutorialData = tutorialDoc.data();

      if (!tutorialData) {
        return;
      }

      setData(tutorialData as Post);

      const arrStr = Cookies.get("recentPostIds") ?? "[]";

      const ids = JSON.parse(arrStr) as string[];

      if (id && !ids.includes(id.toString())) {
        ids.push(id.toString());
        Cookies.set("recentPostIds", JSON.stringify(ids));
      }
    }

    getData();
  }, [params, router]);

  if (data) {
    return (
      <div className={styles.container}>
        <h1>{data.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    );
  }
  return <></>;
}
