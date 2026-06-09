"use client";

//Components
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button/Button";
import Loading from "@/app/components/Loading/Loading";
import Image from "next/image";

//Routes
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";
import Link from "next/link";

//Context
import { useAuth } from "@/context/Auth";

//React
import { useState, useEffect } from "react";

import { cadastrarMedico } from "@/Services/doctorListService";

//Styles
import styles from "./CreateDoctor.module.css";

function CreateDoctor() {
  const { loading, setLoading } = useAuth();

  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alert, setAlert] = useState("");
  const [userId, setUserId] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAction()
  };

  const doctor = {
    crm,
    nome,
    especialidade,
    telefone,
    userId,
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const med = JSON.parse(userStr).id;

    setUserId(med)

  })


  const handleAction = () => {
    async function createMedic() {
      setLoading(true);
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("Usuário não autenticado");
        console.log(userStr)

        const token = JSON.parse(userStr).token;
        if (!token) throw new Error("Token inválido");


        const data = await cadastrarMedico(doctor, token);
      } catch (error) {
        console.error("Erro ao criar médico:", error);
      } finally {
        setLoading(false);
      }
    }
    createMedic();
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
              <circle cx="20" cy="10" r="2" />
            </svg>
          </div>
          <div>
            <p className={styles.headerTitle}>Novo Medico</p>
            <p className={styles.headerSubtitle}>Preencha os dados abaixo</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.basicInfo}>
                <div className={styles.infoBox}>
                  <span className={styles.description}>Digite seu Nome</span>
                  <Input
                    type={"text"}
                    onChange={(e) => setNome(e.target.value)}
                    variant={"form"}
                    value={nome}
                    placeholder=""
                  />
                  {alert && (
                    <span className={styles.alert}>Credenciais invalidas</span>
                  )}
                </div>
                <div className={styles.infoBox}>

                  <span className={styles.description}>Digite seu CRM</span>
                  <Input
                    type={"text"}
                    onChange={(e) => setCrm(e.target.value)}
                    variant={"form"}
                    value={crm}
                    placeholder=""
                  />
                </div>
              </div>

              {alert && (
                <div className={styles.alert}>Credenciais invalidas</div>
              )}

              <span className={styles.description}>
                Digite sua Especialidade
              </span>
              <Input
                type={"text"}
                onChange={(e) => setEspecialidade(e.target.value)}
                variant={"form"}
                value={especialidade}
                placeholder=""
              />

              {alert && (
                <div className={styles.alert}>Credenciais invalidas</div>
              )}

              <span className={styles.description}>Digite seu Telefone</span>
              <Input
                type={"text"}
                onChange={(e) => setTelefone(e.target.value)}
                variant={"form"}
                value={telefone}
                placeholder=""
              />

              {alert && (
                <div className={styles.alert}>Credenciais invalidas</div>
              )}
            </div>
            <div className={styles.buttonBox}>
              <Button
                onClick={() => { }}
                text="Ir"
                variant="default"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default CreateDoctor;
