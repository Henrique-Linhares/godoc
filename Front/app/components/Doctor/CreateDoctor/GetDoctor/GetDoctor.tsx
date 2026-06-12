import styles from './GetDoctor.module.css'
import { deletarMedico } from '@/Services/doctorListService'
import { useState, useEffect } from 'react'
import { useDoc } from '@/context/Doc'
import { useAuth } from '@/context/Auth'

const GetDoctor = () => {
    const { doc } = useDoc()
    const { loading, setLoading } = useAuth()

    const [token, setToken] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) setToken(JSON.parse(user).token)
    }, [])

    async function deleteDoctor(id: number) {
        try {
            setLoading(true)
            await deletarMedico(id, token)
        } catch (error) {
            console.error('Erro ao excluir médico:', error)
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
                            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                            <circle cx="20" cy="10" r="2" />
                        </svg>
                    </div>
                    <div>
                        <span className={styles.headerTitle}>Médicos cadastrados</span>
                        <p className={styles.headerSubtitle}>Lista completa de médicos</p>
                    </div>
                </div>

                <div className={styles.cardBox}>
                    {doc.map(item =>
                        <div key={item.id} className={styles.card}>
                            <div className={styles.iconContainer}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bbfbf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                                    <circle cx="20" cy="10" r="2" />
                                </svg>
                            </div>

                            <div className={styles.infoContainer}>
                                <div className={styles.nameBox}>
                                    <h1>{item.nome}</h1>
                                </div>
                                <div className={styles.credentialsBox}>
                                    <div className={`${styles.info} ${styles.crm}`}>
                                        <p>CRM</p>
                                        <span>{item.crm}</span>
                                    </div>
                                    <div className={`${styles.info} ${styles.especialidade}`}>
                                        <p>Especialidade</p>
                                        <span>{item.especialidade}</span>
                                    </div>
                                    <div className={`${styles.info} ${styles.telefone}`}>
                                        <p>Telefone</p>
                                        <span>{item.telefone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.iconBox}>
                                <div className={styles.icon} onClick={() => deleteDoctor(item.id)}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GetDoctor