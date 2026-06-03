'use client'


//Components
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button/Button"
import Loading from "@/app/components/Loading/Loading";
import Image from "next/image"

//Routes
import { ROUTES } from "@/routes/routes"
import { useRouter } from 'next/navigation';
import Link from 'next/link'

//Context
import { useAuth } from "@/context/Auth";

//React
import { useState, useEffect } from "react"

//Styles
import styles from "./page.module.css"

import { criarConta } from "@/Services/userService";


function MedForm() {

    const { loading, setLoading } = useAuth()

    const [name, setName] = useState("");
    const [crm, setCrm] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [alert, setAlert] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const data = localStorage.getItem('user')
    const token = JSON.parse(data).token


    const handleAction = (name: string, crm: string, especialidade: string, telefone: string, token: string ) => {

        const obj = {
            name,
            crm,
            especialidade,
            telefone
        }

        async function createMedic(obj : any, token: string) {
            setLoading(true)
            try {
                const data = await criarConta(obj, token)
                console.log(data)
            } catch (error) {
                console.error('Erro ao criar médico:', error);
            }

        }

        createMedic(data, token)
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formContainer}>
                        <div className={styles.inputContainer}>
                            <span className={styles.description}>Digite seu Nome</span>
                            <Input
                                type={'text'}
                                onChange={(e) => setName(e.target.value)}
                                variant={'default'}
                                value={name}
                                placeholder="" />
                            {alert && <span className={styles.alert}>Credenciais invalidas</span>}

                            <span className={styles.description}>Digite seu CRM</span>
                            <Input
                                type={'text'}
                                onChange={(e) => setCrm(e.target.value)}
                                variant={'default'}
                                value={crm}
                                placeholder="" />

                            {alert && <div className={styles.alert}>Credenciais invalidas</div>}

                            <span className={styles.description}>Digite sua Especialidade</span>
                            <Input
                                type={'text'}
                                onChange={(e) => setEspecialidade(e.target.value)}
                                variant={'default'}
                                value={especialidade}
                                placeholder="" />

                            {alert && <div className={styles.alert}>Credenciais invalidas</div>}

                            <span className={styles.description}>Digite seu Telefone</span>
                            <Input
                                type={'text'}
                                onChange={(e) => setTelefone(e.target.value)}
                                variant={'default'}
                                value={telefone}
                                placeholder="" />

                            {alert && <div className={styles.alert}>Credenciais invalidas</div>}
                        </div >
                        <Button
                            onClick={() => handleAction(token, name, crm, especialidade, telefone)}
                            text="Ir"
                            variant="default"
                            type="submit" />

                    </div>
                </form >
            </div>
            {loading && (
                <div className={styles.loadingContainer}>
                    <Loading />
                </div>
            )}
        </div >
    )
}





export default MedForm