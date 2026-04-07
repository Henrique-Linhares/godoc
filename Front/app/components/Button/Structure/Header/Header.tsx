
'use client'

import styles from "./page.module.css"
import Button from "../../Button/Button"
import { Interface } from "readline"
import { useRouter } from 'next/navigation';

function Header() {

    const router = useRouter()

    const routerContact = () => {
        router.push('/Login')
    }
    
    return (
        <div>GODOC
            <Button text="Login" onClick={routerContact} variant="default" type="text" />
            <Button text="Contato" onClick={routerContact} variant="default" type="text" />
        </div>

    )
}

export default Header