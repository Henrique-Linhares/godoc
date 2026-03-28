'use client'

import Input from "../components/Button/Input/Input"
import Button from "../components/Button/Button/Button"

import { useState } from "react"

const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")


import styles from "./page.module.css"

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

}

const compFields = [
    {
        id: "email",
        type: "text",
        placeholder: "Email",
        value: "",
        variant: "default"
    },
    {
        id: "senha",
        type: "passworld",
        placeholder: "Senha",
        value: "",
        variant: "default"
    }
]


    
console.log("variant:", compFields[0]?.variant);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.loginContainer}>
                    <span className='title'>Criar Conta</span>
                    <div className={styles.inputContainer}>
                        <span className={styles.description}>Digite seu email</span>
                        <Input
                            type={compFields[0].type}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={compFields[0].variant}
                            value={email}
                            placeholder="" />
                        <span className={styles.description}>Digite sua senha </span>
                        <Input
                            type={compFields[1].type}
                            onChange={() => {}}
                            variant={compFields[1].variant}
                            value={senha} 
                            placeholder=""/>
                    </div >
                    <Button 
                    onClick={() => {}}
                    text="Ir"
                    variant="default"
                    type="submit"/>
                </div>
                <div className={styles.logoContainer}>

                </div>
            </form >
        </>
    )
}


export default Login;