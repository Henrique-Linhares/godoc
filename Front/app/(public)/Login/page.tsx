"use client";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button/Button";
import Image from "next/image";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";

import { users } from "@/services/users";

import { useAuth } from "@/context/Auth";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

import Loading from "../../components/Loading/Loading";
import Link from "next/link";

import { login as loginService } from "@/Services/doctorListService";

import MedForm from "@/app/components/Medform/page";
import { consultarMedicos } from "@/Services/doctorListService";

import { useDoc } from "@/context/Doc";

type dada = {
  email: string; // 'string' minúsculo é o correto em TypeScript
  password: string;
};

import AuthForm from "@/app/components/CredentialCard/AuthForm ";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);
  const [userData, setUserData] = useState([]);

  const [medFormOn, setMedFormOn] = useState(false);

  const { login, loading, setLoading } = useAuth();

  const { doc, setDoc } = useDoc();

  const handleAction = async () => {
    setLoading(true);

    try {
      const data = await loginService({ password, email });

      if (data) {
        const userData = data;
        setUserData(userData);

        localStorage.setItem("user", JSON.stringify(userData));

        login(userData);

        //router.push(ROUTES.dashboard);
        setMedFormOn(true);
        setLoading(false);
      }
    } catch {
      setAlert(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleMedLogin = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const token = JSON.parse(storedUser).token;

      const data = await consultarMedicos(token);

      if (data) {
        setDoc(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(() => {
  //     async function getLogin(dataReceived: dada) {
  //         const data = await login(dataReceived);
  //         console.log(data); // Exemplo de uso do retorno
  //     }

  //     getLogin(dadosRecebida)
  //     setLoading(true)

  //     const getLocal = localStorage.getItem("user")

  //     if (getLocal) {
  //         login(JSON.parse(getLocal))
  //     }
  //     setLoading(false)
  // }, [])

  useEffect(() => {
    async function restoreSession() {
      setLoading(true);
      try {
        const getLocal = localStorage.getItem("user");
        if (getLocal) {
          login(JSON.parse(getLocal));
        }
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

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
          type={"login"}
        />
      </div>

      {medFormOn && <MedForm handleMedLogin={handleMedLogin} />}

      {loading && <Loading />}
    </>
  );
}

export default Login;
