import Link from "next/link";
import styles from "./Navbar.module.css";

function NavLink({ link, text }: { link: string; text: string }) {
  return (
    <div className={styles.navlink}>
      <Link href={link}>{text}</Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <div>
      <NavLink link="/" text="Home" />
      <NavLink link="/login" text="Login" />
    </div>
  );
}
