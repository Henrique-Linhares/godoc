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


import AuthForm from "@/app/components/CredentialCard/AuthForm "

function Login() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [alert, setAlert] = useState(false)

    const { user, logged, login, logout, loading, setLoading } = useAuth()


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }


    const router = useRouter()

    const handleAction = () => {

        const userFind = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        )

        console.log(userFind)

        if (userFind) {

            const UserData = {
                email: email,
                name: userFind.user,
                tipo: userFind.type
            }

            login({ ...UserData})

            router.push(ROUTES.dashboard)
            localStorage.setItem("user", JSON.stringify(UserData))
        } else {
            setAlert(true)
        }
    }

    useEffect(() => {
        setLoading(true)

        const getLocal = localStorage.getItem("user")


        if (getLocal) {
            login(JSON.parse(getLocal))
            console.log("PRINTADO", JSON.parse(getLocal))
        }
        console.log("LOGADO", getLocal)
        setLoading(false)
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