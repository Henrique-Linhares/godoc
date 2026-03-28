import Image from "next/image";
import Login from '../app/Login/page'

import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.appContainer}>
      <Login />
    </div>
    );
}
