"use client";

import styles from "./docbox.module.css";
import { consultarMedicos } from "@/Services/doctorListService";

// Import context
import { useSearch } from "@/context/Search";

// Import useRouter for navigation
import { useRouter } from "next/navigation";

import Image from "next/image";
import { ROUTES } from "@/routes/routes";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/Auth";

//
type DoctorAction = {
  label: string;
  type: "primary" | "secondary";
};

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  availableToday: boolean;
  avatar: string;
  action: DoctorAction;
};

const DoxCard = () => {
  const router = useRouter();
  const { search } = useSearch();

  const [doctors, setDoctors] = useState<Doctor[] | null>([]);
  const [alert, setAlert] = useState(false);

  const { setLoading } = useAuth()

  useEffect(() => {
    let parsed = "";
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      parsed = JSON.parse(storedUser).token;
    }
    const handleDoctors = async () => {
      try {
        const data = await consultarMedicos(parsed);
        if (data) {
          setDoctors(data);
        } else {
            
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    handleDoctors();
  }, []);

  const filtrados = doctors?.filter(
    (item) =>
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.especialidade.toLowerCase().includes(search.toLowerCase()),
  );


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {filtrados?.map((item, index) => {
          return (
            <div key={index} className={styles.info}>
              <div className={styles.ImageDisplay}>
                <Image
                  src={"/imagem-do-usuario-com-fundo-preto.png"}
                  alt="Godoc"
                  width={50}
                  height={50}
                  className={styles.docImage}
                />
              </div>
              <div className={styles.details}>
                <span className={styles.name}>{item.nome}</span>
                <div className={styles.meta}>
                  <span>{item.especialidade}</span>
                  <span>{item.crm}</span>
                </div>
                <div className={styles.ratings}></div>
              </div>
              <div className={styles.scheduleInfo}>
                <div
                  className={
                    item.availableToday === true
                      ? styles.availableToday
                      : styles.notAvaibleToday
                  }
                >
                  <span>
                    {item.availableToday === true
                      ? "Disponível Hoje"
                      : "Disponível em Breve"}
                  </span>
                </div>
                <div
                  onClick={() => {
                    router.push(ROUTES.form);
                  }}
                  className={styles.action}
                >
                  <span>Marcar</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {alert ? <div>Erro ao carregar....</div> : ""}
    </div>
  );
};

export default DoxCard;
