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

//Styles
import styles from "./page.module.css";
import { cadastrarMedico } from "@/Services/doctorListService";

function UserForm() {
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


  const handleAction = () => {
    async function createMedic() {
  setLoading(true);
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) throw new Error("Usuário não autenticado");
    console.log(userStr)

    const token = JSON.parse(userStr).token;
    if (!token) throw new Error("Token inválido");

    console.log(token)
    console.log(doctor)

    const data = await cadastrarMedico(doctor, token);
    console.log(data);
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <span className={styles.description}>Digite seu Nome</span>
              <Input
                type={"text"}
                onChange={(e) => setNome(e.target.value)}
                variant={"default"}
                value={nome}
                placeholder=""
              />
              {alert && (
                <span className={styles.alert}>Credenciais invalidas</span>
              )}

              <span className={styles.description}>Digite seu CRM</span>
              <Input
                type={"text"}
                onChange={(e) => setCrm(e.target.value)}
                variant={"default"}
                value={crm}
                placeholder=""
              />

              {alert && (
                <div className={styles.alert}>Credenciais invalidas</div>
              )}

              <span className={styles.description}>
                Digite sua Especialidade
              </span>
              <Input
                type={"text"}
                onChange={(e) => setEspecialidade(e.target.value)}
                variant={"default"}
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
                variant={"default"}
                value={telefone}
                placeholder=""
              />

              {alert && (
                <div className={styles.alert}>Credenciais invalidas</div>
              )}
            </div>
            <Button
            onClick={() => {}}
              text="Ir"
              variant="default"
              type="submit"
            />
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

export default UserForm;
