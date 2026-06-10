import Image from "next/image";
import HomePage from './(private)/Catalog/page'


import LandingPage from "./(public)/LandingPage/page";
import PublicLayout from "./(public)/layout";

import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.appContainer}>
      <LandingPage />
    </div>
    );
}
