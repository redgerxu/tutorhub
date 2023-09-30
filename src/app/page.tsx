import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.center}>Welcome to TutorHub!</h1>
    </div>
  );
}
