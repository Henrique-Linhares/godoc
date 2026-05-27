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
import { useAuth } from '@/context/Auth';


import { Modal } from '../../Modal/Modal';
import Loading from '../../Loading/Loading';
import { object } from 'motion/react-client';


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



const DoxCard = () => {

    const router = useRouter();
    const { search } = useSearch();


    const [openModal, setOpenModal] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[] | null>([]);
    const [token, setToken] = useState('')

    const { login, loading, setLoading } = useAuth()



    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsed = JSON.parse(storedUser).token
            setToken(parsed)
            console.log("TOKEN RECEBIDO", parsed)


        } else {
        }
    }, [])

    useEffect(() => {

        let parsed = ''
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            parsed = JSON.parse(storedUser).token

        }
        const handleDoctors = async () => {

            try {
                console.log("TOKEN RECEBIDO", parsed)
                const data = await consultarMedicos(parsed)
                setDoctors(data)
                console.log("sdsd", doctors)
            } catch (err) {
                console.error(err)
            } finally {
            }
        }

        handleDoctors()
    }, [])  // ← adiciona token na dependência

    // useEffect(() => {
    //     async function carregarMedicos() {
    //         const medicos = await consultarMedicos()
    //         setDoctors(medicos)
    //     }

    // console.log("DSDS", doctors)
    const filtrados = doctors?.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase()) || item.especialidade.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.container}>

            <div className={styles.card}>
                {filtrados?.map((item, index) => {
                    return (
                        <div key={index} className={styles.info}>
                            <div className={styles.ImageDisplay}>
                                <Image src={'/cleiton.png'} alt="Godoc" width={50} height={50} />
                            </div>
                            <div className={styles.details}>
                                <span className={styles.name}>{item.nome}</span>
                                <div className={styles.meta}>
                                    <span>{item.especialidade}</span>
                                    <span>{item.crm}</span>
                                </div>
                                <div className={styles.ratings}>
                                </div>
                            </div>
                            <div className={styles.scheduleInfo}>
                                <div className={item.availableToday === true ? styles.availableToday : styles.notAvaibleToday}>
                                    <span>{item.availableToday === true ? "Disponível Hoje" : "Disponível em Breve"}</span>
                                </div>
                                <div onClick={
                                    () => { setOpenModal(true) }}
                                    className={styles.action}
                                >
                                    <span>Marcar</span>

                                    {openModal && <Modal setOpenModal={() => setOpenModal(false)} />}
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