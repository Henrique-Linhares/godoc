import styles from './GetDoctor.module.css'
import { deletarMedico } from '@/Services/doctorListService'
import { consultarMedicos } from '@/Services/doctorListService'
import Button from '@/app/components/Button/Button/Button'
import { useState, useEffect } from 'react'
import { useDoc } from '@/context/Doc'
import { useAuth } from '@/context/Auth'

type Doctor = {
    id: number;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    reviews: number;
    availableToday: boolean;
    avatar: string;
};

const GetDoctor = () => {

    const { doc } = useDoc()

  const { loading, setLoading } = useAuth();

    const user = localStorage.getItem('user')
    if (!user) {
        console.error('Usuário não encontrado no localStorage');
        return;
    }

    const token = JSON.parse(user).token;

    async function deleteDoctor(id: number, token: string) {
        try {
            setLoading(true)
            const data = await deletarMedico(id, token)
        } catch (error) {
            console.error('Erro ao excluir pacientes:', error)
        } finally {
            setLoading(false)
        }
    }

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
                        <span className={styles.headerTitle}>Medicos Cadastrados</span>
                        <p className={styles.headerSubtitle}>Lista Completa de medicos </p>
                    </div>
                </div>
                <div className={styles.cardBox}>
                    {doc.map(item =>
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
                                <div className={styles.buttonBox}>
                                    <Button onClick={async () => { await deleteDoctor(item.id, token) }} type='text' variant='default' text='Deletar' />
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>)
}

export default GetDoctor;