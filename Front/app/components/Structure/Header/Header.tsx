
'use client'

import styles from "./page.module.css"
import Button from "@/app/components/Button/Button/Button"
import { ROUTES } from "@/routes/routes"

import { useEffect } from "react"

import { useAuth } from "@/context/Auth"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import img from '/Godoc.png';

function Header() {

    const { user, logout } = useAuth()

    const router = useRouter()

    useEffect(() => {
        if (user) return router.push(ROUTES.catalog)
    },[user])


    if (user?.name) {
        console.log('FOI')
    } else {
        console.log("não foi")
        console.log("user", user?.name)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logoBox}>
                <Image src={'/logo_pequena_sem_fundo.png'} alt="Godoc" width={80} height={60} />
            </div>
            <div className={styles.leftContainer}>
                <div className={user === null ? styles.buttonBox : styles.buttonBoxNotActivated}>
                    <Button text="Login" onClick={() => { router.push(ROUTES.login) }} variant="default" type="text" />
                    <Button text="Contato" onClick={() => { router.push(ROUTES.catalog) }} variant="default" type="text" />
                </div>
                <div className={user !== null ? styles.profileContainer : styles.profileContainerNotActivated}>
                    <Image
                      className={styles.icon}
                      src={'/header/botao-quadrado-de-logout.png'}
                      alt="icons"
                      width={15}
                      height={15}
                      onClick={() => {logout()}}
                    />
                    <span className={styles.span}>{user?.name}</span>
                    <div className={styles.profileImage}>
                        <Image src={'/cleiton.png'} alt="Godoc" width={40} height={40} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header