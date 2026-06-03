"use client";

import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button/Button";
import Loading from "@/app/components/Loading/Loading";
import { useAuth } from "@/context/Auth";
import { useState } from "react";
import styles from "./page.module.css";
import { cadastrarPaciente } from "@/Services/clientService";

function UserForm() {
  const { loading, setLoading } = useAuth();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alert, setAlert] = useState("");
  const [userId, setUserId] = useState(1);

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
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <span className={styles.description}>Nome</span>
            <Input
              type="text"
              onChange={(e) => setNome(e.target.value)}
              variant="form"
              value={nome}
              placeholder=""
            />

            <span className={styles.description}>Idade</span>
            <Input
              type="number"
              onChange={(e) => setIdade(e.target.value)}
              variant="form"
              value={idade}
              placeholder=""
            />

            <span className={styles.description}>CPF</span>
            <Input
              type="text"
              onChange={(e) => setCpf(e.target.value)}
              variant="form"
              value={cpf}
              placeholder="000.000.000-00"
            />

            <span className={styles.description}>Data de Nascimento</span>
            <Input
              type="date"
              onChange={(e) => setDataNascimento(e.target.value)}
              variant="form"
              value={dataNascimento}
              placeholder=""
            />

            <span className={styles.description}>Telefone</span>
            <Input
              type="text"
              onChange={(e) => setTelefone(e.target.value)}
              variant="form"
              value={telefone}
              placeholder="(11) 99999-9999"
            />

            {alert && <span className={styles.alert}>{alert}</span>}
          </div>
          <div className={styles.buttonBox}>
            <Button
              onClick={() => {}}
              text="Ir"
              variant="default"
              type="submit"
            />
            <Button
              onClick={() => {}}
              text="Voltar"
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
