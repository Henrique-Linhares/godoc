
'use client'

import styles from "./page.module.css"
import Button from "../../Button/Button"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import img from '/Godoc.png';

function Header() {

    const router = useRouter()

    const routerContact = () => {
        router.push('/Login')
    }

    return (
        <div className={styles.layout}>
            <div className={styles.logoBox}>
                <Image src={'/Godoc.png'} alt="Godoc" width={150} height={50} />
            </div>
            <div className={styles.buttonBox}>
                <Button text="Login" onClick={routerContact} variant="default" type="text" />
                <Button text="Contato" onClick={routerContact} variant="default" type="text" />
            </div>
        </div>
    )
}

export default Header