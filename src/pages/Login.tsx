import styles from "./Navbar.module.css";

export default function Login() {
  return (
    <div>
      <section className={styles.userAuthentication}>
        <div className={styles.registration}>
          <h2>Register</h2>
          <form id="registration-form">
            <input type="text" id="username" placeholder="Username" required />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className={styles.login}>
          <h2>Login</h2>
          <form id="login-form">
            <input
              type="text"
              id="login-username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </section>
    </div>
  );
}
