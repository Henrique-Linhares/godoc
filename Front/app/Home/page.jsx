import DoxCard from "../components/Button/HomeComponents/DocCard/DocCard"
import SearchBox from '@/app/components/Button/HomeComponents/SearchBox/searchBox'
import styles from '@/app/Home/page.module.css'

function HomePage() {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <SearchBox />
                <DoxCard />
            </div>
        </div>

    )
}

export default HomePage;