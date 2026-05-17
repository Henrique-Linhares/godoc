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


import Credentials from "@/app/components/credentialCard/credential"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [alert, setAlert] = useState(false)

    const { user, logged, login, logout, loading, setLoading } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }
    const compFields = [
        {
            id: "email",
            type: "email",
            placeholder: "Email",
            value: "",
            variant: "default"
        },
        {
            id: "senha",
            type: "password",
            placeholder: "Senha",
            value: "",
            variant: "default"
        }
    ]

    const router = useRouter()

    const handleAction = () => {

        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        )

        if (user) {

            login({
                email: email,
                senha: password,
                name: user.user,
                tipo: user.type
            })

            router.push(ROUTES.dashboard)

        } else {

            setAlert(true)
        }
    }

    console.log("sad", logged)

    useEffect(() => {
        setLoading(false)

    }, [loading])

    const type = 'text'


    return (
        <>
            <Credentials
                setEmail={setEmail}
                setPassword={setPassword}
                setName={setName}
                handleAction={handleAction}
                email={email}
                password={password}
                name={name}
                alert={alert}
                image={"/medico.png"}
            />            
        </>
    )
}


export default Login;