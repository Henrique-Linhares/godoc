'use client'

import { useState, useEffect } from "react"
import AuthForm from "@/app/components/credentialCard/AuthForm ";
import { useAuth } from "@/context/Auth"
import { criarConta } from "@/Services/userService"
import styles from "./page.module.css"

function Register() {
    const {setLoading } = useAuth(); 

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false) 

    useEffect(() => {
        setLoading(false) 
    }, [])


    const handleAction = async (email: string, password: string, ) => { 
        setLoading(true);
        setAlert(false);

        try {
            const userData = await criarConta({email, password });
        } catch {
            setAlert(true);
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
                handleAction={() => handleAction(email, password)} 
                email={email}
                password={password}
                name={name}
                alert={alert}
                image={"/clnica.png"}
                type={'register'}
            />
        </div>
    )
}

export default Register;