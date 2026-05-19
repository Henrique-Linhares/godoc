import styles from "./page.module.css";

import { useContext } from "react";

const dataCard1 = {
  title: "Marque suas consultas agora mesmo",
  description: "procure um especialista",
};
const dataCard2 = {
  title: "Cuide da sua saúde",
  description:
    "No GoDoc você encontra médicos perto de você e agenda consultas em poucos cliques - sem filas,sem complicação e sem perder tempo",
};
const data = [
  {
    title: "Encontre",
    description: "Busque Medicos por especialidade, localização",
  },
  {
    title: "Agende em segundo",
    description: "Sem ligações, sem filas",
  },
  {
    title: "Escolh1a o melh1or h1orário",
    description: "Veja datas disponíveis em tempo real",
  },
];

function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.info_card}>
        <div className={styles.info_box}>
          <h1>{dataCard2.title}</h1>
          <span>{dataCard2.description}</span>
        </div>
        <div className={styles.sub_Box}>
          {data.map((item, index) => {
            return (
              <div key={index} className={styles.info_box}>
                <h1>{item.title}</h1>
                <span>{item.description}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.info_card}>
        <div className={styles.info_box}>
          <h1>{dataCard2.title}</h1>
          <span>{dataCard2.description}</span>
        </div>
        <div className={styles.sub_Box}>
          {data.map((item, index) => {
            return (
              <div key={index} className={styles.info_box}>
                <h1>{item.title}</h1>
                <span>{item.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
