
'use client'

import styles from "./page.module.css"
import Button from "@/app/components/Button/Button/Button"
import { ROUTES } from "@/routes/routes"

import { useAuth } from "@/context/Auth"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import img from '/Godoc.png';

function Header() {

    const { user, } = useAuth()

    const router = useRouter()


    return (
        <div className={styles.container}>
            <div className={styles.logoBox}>
                <Image src={'/Godoc.png'} alt="Godoc" width={100} height={50} />
            </div>
            <div className={styles.leftContainer}>
                <div className={user === null ? styles.buttonBox : styles.buttonBoxNotActivated}>
                    <Button text="Login" onClick={() => { router.push(ROUTES.login) }} variant="default" type="text" />
                    <Button text="Contato" onClick={() => { router.push(ROUTES.home) }} variant="default" type="text" />
                </div>
                <div className={user !== null ? styles.profileContainer : styles.profileContainerNotActivated}>
                    <span>{user?.name}</span>
                    <div className={styles.profileImage}>
                        <Image src={'/cleiton.png'} alt="Godoc" width={40} height={40} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header