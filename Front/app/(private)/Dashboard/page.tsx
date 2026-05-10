'use client'

import styles from './page.module.css'

import { AuthProvider, useAuth } from '@/context/Auth'
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes/routes'
import Button from '@/app/components/Button/Button/Button'

function Dashboard() {

    const pacients =[{id: 1, name: "dsds"}]

    const auth = useAuth()
    const router = useRouter()

    const user =auth.user
    
    return (
        <div className={styles.container}>
            <div className={styles.roleContainer}>
                <div className={styles.doctorRole}>
                        {pacients.map((pacient) => {
                            return (
                                <span>{pacient.name}</span>
                            )
                        })}
                </div>
                <div className={styles.clientRole}>
                     <Button
                            onClick={() => router.push(ROUTES.catalog)}
                            text="Ir"
                            variant="default"
                            type="submit" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;