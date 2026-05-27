'use client'

import DoxCard from "../../components/HomeComponents/DocCard/DocCard"
import SearchBox from '@/app/components/HomeComponents/SearchBox/searchBox'
import styles from "@/app/(private)/Catalog/page.module.css"

import { useAuth } from "@/context/Auth";



function HomePage() {

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.container}>
                    <div className={styles.searchContainer}>
                        <SearchBox />
                    </div>
                    <div className={styles.boxCardContainer}>
                        <DoxCard />
                    </div>
                </div>
            </div>
        </>

    )
}

export default HomePage;