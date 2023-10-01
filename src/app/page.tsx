import styles from "./page.module.scss";

function SignUpButton() {
  return (
    <button
      className={styles.signupbtn}
      onClick={() => {
        window.location.href = "/login";
      }}
    >
      Sign Up Today!
    </button>
  );
}

export default function Home() {
  const sections = [
    {
      title: "Welcome to TutorHub!",
      text: "TutorHub is a dynamic online platform that fosters global communication and collaboration among individuals passionate about education.",
      alignLeft: true,
    },
    {
      title: "Engage in Meaningful Discussions",
      text: "Through its diverse array of forums and tutorials, TutorHub brings together people from around the world to engage in meaningful discussions and share knowledge across a wide spectrum of subjects.",
      alignLeft: false,
    },
    {
      title: "Promote Knowledge Exchange",
      text: "Whether seeking answers to challenging questions or offering expertise to others, TutorHub serves as a vibrant hub for learners and educators alike, promoting the exchange of ideas and insights across borders.",
      alignLeft: true,
    },
    {
      title: "Expand Your Horizons",
      text: "Join us on TutorHub to connect, learn, and expand your horizons in the world of education.",
      alignLeft: false,
    },
  ];

  return (
    <div className={styles.main}>
      {sections.map((section, index) => (
        <div
          key={index}
          className={styles.row}
          style={{ float: section.alignLeft ? "left" : "right" }}
        >
          <div className={styles.title}>
            <h1>{section.title}</h1>
            <p>{section.text}</p>
          </div>
        </div>
      ))}
      <SignUpButton />
    </div>
  );
}
