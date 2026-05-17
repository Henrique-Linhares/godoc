'use client'

//Components
import Input from "../Input/Input"
import Button from "../Button/Button/Button"
import Loading from "../Loading/Loading";
import Image from "next/image"

//Routes
import { ROUTES } from "@/routes/routes"
import { useRouter } from 'next/navigation';
import Link from 'next/link'

//Context
import { useAuth } from "@/context/Auth";

//Users
import { users } from '@/services/users'

//React
import { useState, useEffect } from "react"

//Styles
import styles from "./page.module.css"

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
}



interface Props {
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setName: (value: string) => void
    handleAction: () => void
    email: string
    password: string
    name: string,
    alert: boolean,
    image: string,
    type: string
}

const AuthForm = ({ setEmail, setPassword, setName, handleAction, email, password, name, alert, image, type }: Props) => {

    const { user, logged, login, logout, loading, setLoading } = useAuth()

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.loginContainer}>
                            {type === 'login' ? <h1>Login</h1> : <h1>Criar Conta</h1>}
                            <div className={styles.inputContainer}>
                                <span className={styles.description}>Digite seu nome </span>
                                <Input
                                    type={'text'}
                                    onChange={(e) => setName(e.target.value)}
                                    variant={'default'}
                                    value={name}
                                    placeholder="" />

                                {alert && <div className={styles.alert}>Credenciais invalidas</div>}
                                <span className={styles.description}>Digite seu email</span>
                                <Input
                                    type={'text'}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant={'default'}
                                    value={email}
                                    placeholder="" />
                                {alert && <div className={styles.alert}>Credenciais invalidas</div>}

                                <span className={styles.description}>Digite sua senha </span>
                                <Input
                                    type={'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant={'default'}
                                    value={password}
                                    placeholder="" />

                                {alert && <div className={styles.alert}>Credenciais invalidas</div>}

                            </div >
                            <Button
                                onClick={handleAction}
                                text="Ir"
                                variant="default"
                                type="submit" />

                            {type === 'login' ? <p>Não tem conta? <Link className={styles.link} href="/Register">Cadastre-se →</Link></p> :
                                <p>Ja tem conta?<Link className={styles.link} href="/Login">login →</Link></p>}

                        </div>
                    </form >
                    <div className={styles.imageWrapper}>
                        <Image src={image} alt="Godoc" fill style={{ objectFit: 'cover' }} />
                    </div>
                </div>
                <div className={styles.logoContainer}>
                </div>
            </div >
            {loading && (
                <div className={styles.loadingContainer}>
                    <Loading />
                </div>
            )
            }
        </>
    )
}

export default AuthForm 