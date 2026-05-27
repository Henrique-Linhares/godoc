'use client'

import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button/Button"
import Image from "next/image"
import { ROUTES } from "@/routes/routes"
import { useRouter } from 'next/navigation';

import { users } from '@/services/users'

import { useAuth } from "@/context/Auth";

import { useState, useEffect } from "react"
import styles from "./page.module.css"

import Loading from "../../components/Loading/Loading";
import Link from 'next/link'


import { login as loginService } from '@/Services/doctorListService'


type dada = {
    email: string; // 'string' minúsculo é o correto em TypeScript
    password: string;
};


import AuthForm from "@/app/components/CredentialCard/AuthForm "


function Login() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [alert, setAlert] = useState(false)
    const [userData, setUserData] = useState([])

    const { login, loading, setLoading } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAction()
    }

    const handleAction = async () => {

        setLoading(true)

        try {
            const userData  = await loginService({ password, email })
            setUserData(userData)

            localStorage.setItem("user", JSON.stringify(userData))

            login(userData)

            router.push(ROUTES.dashboard)
        setLoading(false)

        } catch {
        setAlert(true)
        setLoading(false)

        }
    }
    // useEffect(() => {
    //     async function getLogin(dataReceived: dada) {
    //         const data = await login(dataReceived);
    //         console.log(data); // Exemplo de uso do retorno
    //     }

    //     getLogin(dadosRecebida)
    //     setLoading(true)

    //     const getLocal = localStorage.getItem("user")


    //     if (getLocal) {
    //         login(JSON.parse(getLocal))
    //     }
    //     setLoading(false)
    // }, [])

    useEffect(() => {
        async function restoreSession() {
            setLoading(true)
            try {
                const getLocal = localStorage.getItem("user")
                if (getLocal) {
                    login(JSON.parse(getLocal))
                }
            } finally {
                setLoading(false)
            }
        }
        restoreSession()
    }, [])

    return (
        <>
            <div className={styles.container}>
                <AuthForm
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setName={setName}
                    handleAction={handleAction}
                    email={email}
                    password={password}
                    name={name}
                    alert={alert}
                    image={"/medico.png"}
                    type={'login'}
                />
            </div>

            {loading && <Loading />}

        </>

    )
}


export default Login;