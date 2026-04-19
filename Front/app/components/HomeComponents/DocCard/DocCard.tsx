"use client";

import styles from './docbox.module.css'
import { doctors } from '@/services/doctorListService'

// Search Provider import
import { useSearch } from '../../Search/Search';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { ROUTES } from "@/routes/routes"
import { useState } from 'react';


import { Modal } from '../../Modal/Modal';

const DoxCard = () => {

    const router = useRouter();
    const { search } = useSearch();

  

    const filtrados = doctors.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) || item.specialty.toLowerCase().includes(search.toLowerCase())
    );

    const [openModal, setOpenModal] = useState(false);


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {filtrados.map((item, index) => {
                    return (
                        <div className={styles.info}>
                            <div className={styles.ImageDisplay}>
                                <Image src={'/cleiton.png'} alt="Godoc" width={50} height={50} />
                            </div>
                            <div className={styles.details}>
                                <span className={styles.name}>{item.name}</span>
                                <div className={styles.meta}>
                                    <span>{item.specialty}</span>
                                    <span>{item.location}</span>
                                </div>
                                <div className={styles.ratings}>
                                </div>
                            </div>
                            <div className={styles.scheduleInfo}>
                                <div className={item.availableToday === true ? styles.availableToday : styles.notAvaibleToday}>
                                    <span>{item.availableToday === true ? "Disponível Hoje" : "Disponível em Breve"}</span>
                                </div>
                                <div onClick={
                                    () => {setOpenModal(true) }}
                                    className={styles.action}
                                >
                                    <span>{item.action.label}</span>

                                    { openModal &&  <Modal setOpenModal={() => setOpenModal(false)}/> }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default DoxCard