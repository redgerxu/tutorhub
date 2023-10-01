"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import { auth } from "@/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";

function NavLink({
  children,
  link,
  classes,
  other,
}: {
  children?: React.ReactNode;
  link: string;
  classes?: string[];
  other?: any;
}) {
  return (
    <div className={styles.navlink + " " + classes?.join(" ")}>
      <Link href={link} {...other}>
        {children}
      </Link>
    </div>
  );
}

function SignUpLogOut({ user }: { user: User | null }) {
  function logout() {
    signOut(auth);
  }

  if (user) {
    return (
      <NavLink
        link=""
        other={{ onClick: logout }}
        classes={[styles.navlink, styles.right]}
      >
        Log Out
      </NavLink>
    );
  }
  return (
    <NavLink link="/login" classes={[styles.right]}>
      Login / Register
    </NavLink>
  );
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.left}
        style={{ display: "flex", alignItems: "center" }}
      >
        <NavLink link="/" classes={[styles.left, styles.logo]}>
          TutorHub
        </NavLink>
        <NavLink link="/home" classes={[styles.left]}>
          Home
        </NavLink>
        <NavLink link="/tutorials" classes={[styles.left]}>
          Tutorials
        </NavLink>
        <NavLink link="/forums" classes={[styles.left]}>
          Forums
        </NavLink>
      </div>
      <SignUpLogOut user={user} />
    </div>
  );
}
