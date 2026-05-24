import styles from "./footer.module.css"
import Image from "next/image"

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.itemBox}>
        <div className={styles.logo}>
          <Image src={'/godoc_logo.png'} alt="Godoc" width={250} height={250} />
        </div>
        <div className={styles.itemBox}>
          <div className={styles.contacContainer}>
            <strong>Sobre</strong>
            <div className={styles.box}>
              <label>Somos uma plataforma de agendamento de consultas médicas, criada para simplificar o acesso à saúde. Conectamos pacientes e profissionais de forma rápida, segura e sem complicações.</label>
            </div>
          </div>
          <div className={styles.suportContainer}>
            <strong>Contato</strong>
            <div className={styles.box}>
              <label>hlinhares453@gmail.com</label>
              <label>guihhsoaress@gmail.com</label>
              <label>(16) 99353-6708</label>
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className={styles.devContainer}>
            <strong>Desenvolvedores</strong>
            <div className={styles.box}>
              {/* {devNames.map((item) => (
              <label>{item}</label>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}




export default Footer