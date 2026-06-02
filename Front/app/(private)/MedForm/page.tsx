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
            const token =JSON.parse(data).token

            
            console.log(token)

    const handleAction = () => {

        async function createMedic() {
            setLoading(true)

           
            try {
                const data = await fetch('http://localhost:5000/api/medicos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    })
                })
            } catch (error) {
                console.error('Erro ao criar médico:', error);
            }

        }
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
                            onClick={handleAction}
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