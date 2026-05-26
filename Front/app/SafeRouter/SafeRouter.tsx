'use client'

import { useEffect } from 'react'
import { useAuth } from "@/context/Auth"
import { useRouter } from 'next/navigation'
import { ROUTES } from "@/routes/routes"

import styles from '@/app/SafeRouter/page.module.css'

import Loading from '../components/Loading/Loading'

type Props = {
    children: React.ReactNode
}

const SafeRouter = ({ children }: Props) => {
    const auth = useAuth()
    const router = useRouter()


    useEffect(() => {
        if (!auth.logged) {
            router.push(ROUTES.login)
        }
    }, [auth.logged])

     if (auth.loading) return  <div className={styles.container}><Loading /></div> 
    if (!auth.logged) return null 

    return children
}

export default SafeRouter