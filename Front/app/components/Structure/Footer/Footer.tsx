import styles from "./footer.module.css"
import Image from "next/image"

function Footer() {

  const images = ['/footer/github.png', '/footer/gmail.png']
  return (
    <div className={styles.footerContainer}>
      <div className={styles.itemBox}>
        <div className={styles.logo}>
          <Image src={'/footer/godoc_logo_centrado_v2.svg'} alt='footer-godoc' className={styles.logoC} fill />
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
              <div className={styles.iconsBox}>
                {images.map((item, index) =>
                  <Image key={index} className={styles.icon}
                    src={item}
                    alt="icons"
                    width={25}
                    height={25}
                    
                  />
                )}
              </div>
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