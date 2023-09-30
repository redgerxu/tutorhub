import { ChangeEvent, ChangeEventHandler, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

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

  function switchRegistering() {
    setRegistering(!registering);
  }

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

        <div className={styles.bottomleft}>
          {registering ? (
            <>
              Have an account?{" "}
              <Link onClick={switchRegistering} href={""}>
                Log in here.
              </Link>
            </>
          ) : (
            <>
              Need an account?{" "}
              <Link onClick={switchRegistering} href={""}>
                Sign up here.
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
