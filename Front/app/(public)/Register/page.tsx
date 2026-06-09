'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthForm from "@/app/components/credentialCard/AuthForm ";
import { useAuth } from "@/context/Auth"
import { criarConta } from "@/Services/userService"
import Swal from "sweetalert2"
import styles from "./page.module.css"

function Register() {
    const { setLoading } = useAuth();
    const router = useRouter();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        setLoading(false)
    }, [])


    const handleAction = async (email: string, password: string) => {
        setLoading(true);
        setAlert(false);

        try {
            const userData = await criarConta({ email, password });

            await Swal.fire({
                icon: 'success',
                title: 'Conta criada!',
                text: 'Seu cadastro foi realizado com sucesso.',
                confirmButtonText: 'Ir para Login',
                confirmButtonColor: '#4f46e5',
                timer: 3000,
                timerProgressBar: true,
            });

            router.push('/Login');
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro',
                text: 'Não foi possível criar sua conta. Tente novamente.',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#ef4444',
            });
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