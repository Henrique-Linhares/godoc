'use client'

//React
import { useState, useEffect } from "react"

//components
import AuthForm from "@/app/components/CredentialCard/AuthForm "

import { useAuth } from "@/context/Auth"
import { useRouter } from "next/router"

import criarConta from "@/Services/criarContaService"


//Styles
import styles from "./page.module.css"

function Register() {

    const auth = useAuth()

    const router = useRouter()


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, seAlert] = useState(false)

    const { login, setLoading } = useAuth();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAction()
    }

    // const handleAction = async () => {

    //         setLoading(true)

    //         try {

    //             const userData  = await loginService({ password, email })

    //             localStorage.setItem("user", JSON.stringify(userData))

    //             login(userData)

    //             router.push(ROUTES.dashboard)
    //         setLoading(false)

    //         } catch {
    //         setAlert(true)
    //         setLoading(false)

    //         }
    //     }

    const handleAction = async () => {
        setLoading(true);
       // setAlert(false);

        try {
            const userData = await criarConta({ password, email });

        } catch {
            //setAlert(true);
        } finally {
            setLoading(false);
        }
    };



    return (
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
                image={"/clnica.png"}
                type={'register'} />
        </div>
    )
}

export default Register;

