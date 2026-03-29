'use client'

import styles from './docbox.module.css'
import { doctors } from '@/Services/doctorListService'

function DoxCard() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {doctors.map((item, index) => {
                    return (
                        <div className={styles.info}>
                            <div className={styles.details}>
                                <span>{item.name}</span>
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