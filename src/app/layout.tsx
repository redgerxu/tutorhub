import "@/app/globals.css";
import styles from "./layout.module.scss";

import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} ${styles.container}`}>
      <Navbar />
      {children}
    </div>
  );
}
