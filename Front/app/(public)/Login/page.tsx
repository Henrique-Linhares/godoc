"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/Auth";
import { useDoc } from "@/context/Doc";

import { login as loginService } from "@/Services/userService";
import { consultarMedicos } from "@/Services/doctorListService";

import AuthForm from "@/app/components/credentialCard/AuthForm ";
import MedForm from "@/app/components/Medform/Medform";
import Loading from "../../components/Loading/Loading";

import styles from "./page.module.css";

function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);
    const [medFormOn, setMedFormOn] = useState(false);

    const { login, loading, setLoading } = useAuth();
    const { doc, setDoc } = useDoc();

    const getDoctors = useCallback(async (token: string) => {
        try {
            const data = await consultarMedicos(token);
            if (data) setDoc(data);
        } catch (err) {
            console.error("Erro ao buscar médicos:", err);
        }
        }, [setDoc]);


    //      useEffect(() => {
    //     let parsed = "";
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //       parsed = JSON.parse(storedUser).token;
    //     }
    //     const handleDoctors = async () => {
    //       try {
    //         const data = await consultarMedicos(parsed);
    //         if (data) {
    //           setDoctors(data);
    //         } else {

    //         }
    //       } catch (err) {
    //         console.error(err);
    //       } finally {
    //       }
    //     };

    //     handleDoctors();
    //   }, []);

    useEffect(() => {
        async function restoreSession() {
            setLoading(true);
            try {
                const stored = localStorage.getItem("user");
                if (!stored) return;

                const userData = JSON.parse(stored);
                login(userData);
                await getDoctors(userData.token);
            } finally {
                setLoading(false);
            }
        }

        restoreSession();
    }, []);

    const handleAction = async () => {
        setLoading(true);
        setAlert(false);

        try {
            const userData = await loginService({ password, email });

            if (!userData) return;

            localStorage.setItem("user", JSON.stringify(userData));
            login(userData);

            await getDoctors(userData.token);
        } catch {
            setAlert(true);
        } finally {
            setLoading(false);
        }
    };

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
                    image="/medico.png"
                    type="login"
                />
            </div>

            {medFormOn && <MedForm handleMedLogin={() => fetchDoctors(JSON.parse(localStorage.getItem("user")!).token)} />}

            {loading && <Loading />}
        </>
    );
}

export default Login;