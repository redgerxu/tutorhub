import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      alert("Invalid email");
      return;
    }

    if (password.length < 8) {
      alert("Password is too short");
      return;
    }

    if (registering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setDoc(doc(db, "users/" + userCredential.user.uid), {
            id: userCredential.user.uid,
            name: email,
            email: email,
          });
          router.push("/home");
        })
        .catch((err) => {
          console.error(err);
          console.log("QUER");
          alert("This account already exists, try signing in");
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push("/home");
        })
        .catch((err) => {
          console.error(err);
          alert("Incorrect email/password");
        });
    }
  }

  const changeEmail: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    setEmail(value);
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
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={changeEmail}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
            required
          />
          <button type="submit">{registering ? "Register" : "Login"}</button>
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
