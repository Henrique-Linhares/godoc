"use client";

import Loading from "@/app/components/Loading/Loading";
import Image from "next/image";

import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/Auth";
import { useDoc } from "@/context/Doc";

import styles from "./GetDoctor.module.css";

type Doctor = {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
  telefone: string;
  userId: number;
};

function GetDoctor() {
  const { loading } = useAuth();
  const { doc } = useDoc();
  const router = useRouter();

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
            <span className={styles.headerTitle}>Médicos Cadastrados</span>
            <p className={styles.headerSubtitle}>Lista completa de médicos</p>
          </div>
        </div>

        <div className={styles.list}>
          {!doc?.length && !loading && (
            <p className={styles.empty}>Nenhum médico encontrado.</p>
          )}

          {doc?.map((item: Doctor) => (
            <div key={item.id} className={styles.info}>
                <div className={styles.card}>
              <div className={styles.ImageDisplay}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </div>

              <div className={styles.details}>
                <span className={styles.name}>{item.nome}</span>
                <div className={styles.meta}>
                  <span>{item.especialidade}</span>
                  <span>{item.crm}</span>
                </div>
                <div className={styles.meta}>
                  <span>{item.telefone}</span>
                </div>
              </div>

              <div className={styles.scheduleInfo}>
                <div
                  className={styles.action}
                  onClick={() => router.push(`${ROUTES.form}?medicoId=${item.id}`)}
                >
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default GetDoctor;