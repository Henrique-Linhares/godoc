"use client";

import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button/Button";
import Loading from "@/app/components/Loading/Loading";
import { useAuth } from "@/context/Auth";
import { useState } from "react";
import styles from "./CreatePacient.module.css";
import { cadastrarPaciente } from "@/Services/clientService";

function CreatePacient() {
  const { loading, setLoading } = useAuth();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alert, setAlert] = useState("");
  const [userId, setUserId] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAction();
  };

  const handleAction = () => {
    async function createMedic() {
      setLoading(true);
      try {
        const userStr = localStorage.getItem("user");
        console.log(userStr);
        if (!userStr) throw new Error("Usuário não autenticado");

        const token = JSON.parse(userStr).token;
        if (!token) throw new Error("Token inválido");

        const pacient = {
          nome,
          idade: Number(idade),
          cpf,
          dataNascimento: new Date(dataNascimento).toISOString(),
          telefone,
          user: {
            id: userId,
          },
        };

        console.log("Enviando:", pacient);
        const data = await cadastrarPaciente(pacient, token);
        console.log("Resposta:", data);
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <p className={styles.headerTitle}>Novo paciente</p>
            <p className={styles.headerSubtitle}>Preencha os dados abaixo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>

            {/* Linha 1: Nome + Idade */}
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
              <div className={styles.fieldSmall}>
                <span className={styles.description}>IDADE</span>
                <Input
                  type="number"
                  onChange={(e) => setIdade(e.target.value)}
                  variant="form"
                  value={idade}
                  placeholder=""
                />
              </div>
            </div>

            {/* CPF */}
            <div className={styles.field}>
              <span className={styles.description}>CPF</span>
              <Input
                type="text"
                onChange={(e) => setCpf(e.target.value)}
                variant="form"
                value={cpf}
                placeholder="000.000.000-00"
              />
            </div>

            {/* Linha 2: Data + Telefone */}
            <div className={styles.row}>
              <div className={styles.field}>
                <span className={styles.description}>DATA DE NASCIMENTO</span>
                <Input
                  type="date"
                  onChange={(e) => setDataNascimento(e.target.value)}
                  variant="form"
                  value={dataNascimento}
                  placeholder=""
                />
              </div>
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
            </div>

            {alert && <span className={styles.alert}>{alert}</span>}
          </div>

          <div className={styles.buttonBox}>
          
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

export default CreatePacient;