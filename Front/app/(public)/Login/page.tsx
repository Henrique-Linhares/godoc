"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/Auth";
import { useDoc } from "@/context/Doc";

import { login as loginService, consultarMedicos } from "@/Services/doctorListService";

import AuthForm from "@/app/components/CredentialCard/AuthForm ";
import MedForm from "@/app/components/Medform/page";
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
    let token = ''

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

    // ── Restaura sessão e já busca médicos se houver token salvo ───────────────
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

    // ── Login + busca de médicos em sequência ──────────────────────────────────
    const handleAction = async () => {
        setLoading(true);
        setAlert(false);

        try {
            const userData = await loginService({ password, email });

            if (!userData) return;

            localStorage.setItem("user", JSON.stringify(userData));
            login(userData);

            await getDoctors(userData.token);
            console.log("DOC", doc)
            setMedFormOn(true);
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