"use client";

import Button from "../Button/Button/Button";
import Input from "../Input/Input";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

import Loading from "../Loading/Loading";

import { useAuth } from "@/context/Auth";

interface ModalProps {
  setOpenModal: (value: boolean) => void;
}

export function Modal({ setOpenModal }: ModalProps) {
  const [email, setEmail] = useState("");
  const { loading, setLoading } = useAuth();
  const [data, setData] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    async function simulateRequest() {
      setLoading(true);
      await delay(1500);
      setLoading(false);
      setOpenModal(false);
    }
    simulateRequest();
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setLoading(!loading);
  }, [data]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span>Formulario para Agendamento do Henrique</span>
          <Input
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            variant={"default"}
            value={email}
            placeholder=""
          />
          <Button
            onClick={() => {}}
            text={"clicar"}
            type="submit"
            variant={"default"}
          />
        </form>
      </div>

      {loading && <Loading />}
    </div>
  );
}
