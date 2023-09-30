import { ChangeEvent, ChangeEventHandler, useState } from "react";
import styles from "./index.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);

  function submit() {
    alert(username + password);
  }

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    setUsername(value);
  };

  const changePassword: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    setPassword(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>{registering ? "Register" : "Login"}</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={changeUsername}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
            required
          />
          <button type="submit" onClick={submit}>
            {registering ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
