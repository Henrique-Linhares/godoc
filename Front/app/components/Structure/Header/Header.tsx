
'use client'

import styles from "./page.module.css"
import Button from "@/app/components/Button/Button/Button"
import { ROUTES } from "@/routes/routes"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import img from '/Godoc.png';

function Header() {

    const router = useRouter()
    const login = true

    return (
        <div className={styles.container}>
            <div className={styles.logoBox}>
                <Image src={'/Godoc.png'} alt="Godoc" width={150} height={50} />
            </div>
            <div className={login !== true ? styles.buttonBox : styles.buttonBoxNotActivated}>
                <Button text="Login" onClick={() => { router.push(ROUTES.login) }} variant="default" type="text" />
                <Button text="Contato" onClick={() => { router.push(ROUTES.login) }} variant="default" type="text" />
            </div>

            <div className={login === true ? styles.profileContainer : ""}>
                <Image src={'/cleiton.png'} alt="Godoc" width={40} height={40} />
            </div>
        </div>
    )
}

export default Header