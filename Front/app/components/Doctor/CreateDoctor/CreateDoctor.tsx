"use client";

import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button/Button";
import Loading from "@/app/components/Loading/Loading";
import { useAuth } from "@/context/Auth";
import { useState, useEffect } from "react";
import styles from "./CreateDoctor.module.css";
import { cadastrarMedico } from "@/Services/doctorListService";
import Swal from "sweetalert2";

function CreateDoctor() {
  const { loading, setLoading } = useAuth();

  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alert, setAlert] = useState("");
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUserId(JSON.parse(userStr).id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAction();
  };

  const handleAction = () => {
    async function createMedic() {
      setLoading(true);
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("Usuário não autenticado");

        const token = JSON.parse(userStr).token;
        if (!token) throw new Error("Token inválido");

        await cadastrarMedico({ crm, nome, especialidade, telefone, userId }, token);

        await Swal.fire({
          icon: "success",
          title: "Médico criado!",
          text: "O médico foi cadastrado com sucesso.",
          confirmButtonColor: "#35C9D6",
          confirmButtonText: "OK",
        });

        setNome("");
        setCrm("");
        setEspecialidade("");
        setTelefone("");
      } catch (error) {
        console.error("Erro ao criar médico:", error);
        await Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível cadastrar o médico. Tente novamente.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Fechar",
        });
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
            <p className={styles.headerTitle}>Novo médico</p>
            <p className={styles.headerSubtitle}>Preencha os dados abaixo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>

            {/* Linha 1: Nome + CRM */}
            <div className={styles.row}>
              <div className={styles.field}>
                <span className={styles.description}>NOME</span>
                <Input
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                  variant="form"
                  value={nome}
                  placeholder=""
                />
              </div>
              <div className={styles.field}>
                <span className={styles.description}>CRM</span>
                <Input
                  type="text"
                  onChange={(e) => setCrm(e.target.value)}
                  variant="form"
                  value={crm}
                  placeholder="CRM/SP 123456"
                />
              </div>
            </div>

            {/* Especialidade */}
            <div className={styles.field}>
              <span className={styles.description}>ESPECIALIDADE</span>
              <Input
                type="text"
                onChange={(e) => setEspecialidade(e.target.value)}
                variant="form"
                value={especialidade}
                placeholder="Ex: Cardiologia, Clínica Geral..."
              />
            </div>

            {/* Telefone */}
            <div className={styles.field}>
              <span className={styles.description}>TELEFONE</span>
              <Input
                type="text"
                onChange={(e) => setTelefone(e.target.value)}
                variant="form"
                value={telefone}
                placeholder="(11) 99999-9999"
              />
            </div>

            {alert && <span className={styles.alert}>{alert}</span>}
          </div>

          <div className={styles.buttonBox}>
            <Button
              onClick={() => {}}
              text="Salvar médico"
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

export default CreateDoctor;