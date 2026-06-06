import styles from './GetPacient.module.css'
import { useState, useEffect } from 'react'

import { cosultarPacientes } from '@/Services/clientService'

interface pacients {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    dataNascimento: string,
    telefone: string

}

const GetPacient = () => {

    const [pacients, setPacients] = useState<pacients[]>([])

    async function getPacients() {
        try {
            const data: pacients[] = await cosultarPacientes()

            console.log(data)

            if (data && data.length > 0) {
                setPacients(data)
            }
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error)
        }
    }

    useEffect(() => {
        getPacients()
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.headerIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <span className={styles.headerTitle}>Pacientes Cadastrados</span>
                        <p className={styles.headerSubtitle}>Lista Completa de pacientes </p>

                    </div>
                </div>
                <div className={styles.cardBox}>
                    {pacients.map(item =>
                        <div className={styles.card}>
                            <div className={styles.iconContainer}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div className={styles.infoContainer}>
                                <div className={styles.nameBox}>
                                    <h1>{item.nome}</h1>
                                </div>
                                <div className={styles.credentialsBox}>
                                    <span>{item.cpf}</span>
                                    <span>{item.telefone}</span>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default GetPacient