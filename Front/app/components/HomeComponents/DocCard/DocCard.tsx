"use client";

import styles from './docbox.module.css'
import { doctors } from '@/services/doctorListService'

import { useSearch } from '@/app/components/Search/Search'
import { useRouter } from 'next/navigation';

import { ROUTES } from "@/routes/routes"


const DoxCard = () => {

    const router = useRouter()
    const { search } = useSearch();

    const filtrados = doctors.filter(item =>

        item.name.toLowerCase().includes(search.toLowerCase()) || item.specialty.toLowerCase().includes(search.toLowerCase())
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
                                <div className={item.availableToday === true ? styles.availableToday : styles.notAvaibleToday}>
                                    <span>{item.availableToday === true ? "Disponível Hoje" : "Disponível em Breve"}</span>
                                </div>
                                <div onClick={() => {router.push(ROUTES.appointment)}} className={styles.action}>
                                    <span>{item.action.label}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DoxCard