'use client'

//React
import { useState, useEffect } from "react"

//components
import AuthForm  from "@/app/components/CredentialCard/AuthForm "

//Styles
import styles from "./page.module.css"


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
}

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, seAlert] = useState(false)

    const handleAction = () => {
        return name
    }

    return (
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
    )
}

export default Register;

