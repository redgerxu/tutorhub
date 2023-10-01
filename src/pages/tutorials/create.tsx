import styles from "./Create.module.scss";

export default function Create() {
  return (
    <div className={styles.container}>
      <h1>Create Forum</h1>
      <form
        action="process_forum_creation.php"
        method="POST"
        encType="multipart/form-data"
      >
        <label htmlFor="forum-title">Title:</label>
        <input type="text" id="forum-title" name="forum-title" required />
        <label htmlFor="forum-description">Description:</label>
        <textarea
          id="forum-description"
          name="forum-description"
          rows={5}
        ></textarea>
        <label htmlFor="file-upload" className="file-label">
          <span>File:</span>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            accept=".jpg, .jpeg, .png"
          />
        </label>
        <input type="submit" value="Create Forum" />
      </form>
    </div>
  );
}
