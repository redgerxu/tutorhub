import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.row}>
          <div className={styles.title}>
            <h1>Welcome to TutorHub!</h1>
            <p>
              Experience a new world of community-powered educational resources.
            </p>
          </div>
          <button className={styles.signupbtn}>Sign Up Today!</button>
      </div>
    </div>
  );
}
