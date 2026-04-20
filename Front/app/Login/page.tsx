'use client'

import Input from "../components/Input/Input"
import Button from "../components/Button/Button/Button"
import { ROUTES } from "@/routes/routes"
import { useRouter } from 'next/navigation';

import { users } from '@/services/users'

import { useAuth } from "@/context/Auth";

import { useState, useEffect } from "react"
import styles from "./page.module.css"

import Loading from "../components/Loading/Loading";

function Login() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)

    const { user, logged, login, logout } = useAuth()

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

    const router = useRouter()

    const validação = () => {


        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === senha
        )

        if (user) {

            login({
                email: email,
                senha: senha,
                name: user.user
            })

            router.push(ROUTES.home)

            alert("LOGIN REALIZADO COM SUCESSO")
        } else {

            alert("LOGIN REALIZADO COM nada")
        }
    }


    useEffect(() => {
        setLoading(true)

    }, [loading])


    return (
        <>
            <div className={styles.container}>
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
                                onChange={(e) => setSenha(e.target.value)}
                                variant={compFields[1].variant}
                                value={senha}
                                placeholder="" />
                        </div >
                        <Button
                            onClick={validação}
                            text="Ir"
                            variant="default"
                            type="submit" />
                    </div>
                    <div className={styles.logoContainer}>
                    </div>
                </form >
            </div>
            {loading && (
                <div className={styles.loadingContainer}>
                    <Loading />
                </div>
            )}
        </>
    )
}


export default Login;