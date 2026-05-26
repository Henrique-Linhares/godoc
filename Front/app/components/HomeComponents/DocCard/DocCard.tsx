"use client";

import styles from './docbox.module.css'
import { consultarMedicos } from '@/Services/doctorListService'


// Import context
import { useSearch } from '@/context/Search';

// Import useRouter for navigation
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { ROUTES } from "@/routes/routes"
import { useEffect, useState } from 'react';


import { Modal } from '../../Modal/Modal';

const DoxCard = async () => {

    const router = useRouter();
    const { search } = useSearch();

  
    const [openModal, setOpenModal] = useState(false);
const [doctors, setDoctors] = useState<Doctor[] | null>([]);

//
type DoctorAction = {
  label: string;
  type: "primary" | "secondary";
};

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  availableToday: boolean;
  avatar: string;
  action: DoctorAction;
};


useEffect(() => {
        async function carregarMedicos() {
            const medicos = await consultarMedicos()
            setDoctors(medicos)
        }

        console.log("DOUTORES", doctors)
})



const filtrados = doctors.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) || item.specialty.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {filtrados.map((item, index) => {
                    return (
                        <div key={index} className={styles.info}>
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