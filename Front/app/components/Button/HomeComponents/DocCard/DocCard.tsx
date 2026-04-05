"use client";

import styles from './docbox.module.css'
import { doctors } from '@/Services/doctorListService'
import { useSearch } from '@/app/components/Search.tsx/Search'




const DoxCard = () => {

      const { search } = useSearch();


    const filtrados = doctors.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {filtrados.map((item, index) => {
                    return (
                        <div className={styles.info}>
                            <div className={styles.display}>
                                {"iamge"}
                            </div>
                            <div className={styles.details}>
                                <span className={styles.name}>{item.name}</span>
                                <div className={styles.meta}>
                                    <span>{item.specialty}</span>
                                    <span>{item.location}</span>
                                </div>
                                <div className={styles.ratings}>
                                    <span>{item.rating}</span>
                                    <span>{item.reviews}</span>
                                </div>
                            </div>
                            <div className={styles.scheduleInfo}>
                                <span>{item.availableToday}</span>
                                <span>{item.action.label}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DoxCard