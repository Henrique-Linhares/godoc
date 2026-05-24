'use client'

import styles from "./footer.module.css"
import Image from "next/image"


function Footer() {

  const images = [
    {
      src: '/footer/github.png',
      title: 'godocOficialGit',
    },
    {
      src: '/footer/gmail.png',
      title: 'godocOfc@gmail.com',
    },
    {
      src: '/footer/instagram.png',
      title: 'godoc_of'
    }
  ]
  const devNames = [
    {title: "Henrique Linhares", git: ''},
    {title: "Guilherme Soares",git: ''},
    {title: "Kaique Santos",git: ''},
    {title: "Tatiana Silva",git: ''},
    {title:"Victor Lemos",git: 'VictorLemosbar'}
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.itemBox}>
        <div className={styles.logo}>
          <Image src={'/footer/godoc_logo_centrado_v2.svg'} alt='footer-godoc' className={styles.logoC} fill />
        </div>
        <div className={styles.itemBox}>
          <div className={styles.contacContainer}>
            <strong>Sobre</strong>
            <div className={styles.boxStatic}>
              <label id={styles.static}>Somos uma plataforma de agendamento de consultas médicas, criada para simplificar o acesso à saúde. Conectamos pacientes e profissionais de forma rápida, segura e sem complicações.</label>
            </div>
          </div>
          <div className={styles.suportContainer}>
            <strong>Contato</strong>
            <div className={styles.box}>
              <div className={styles.iconsBox} title="sad" onClick={() => alert("Pagina não disponível")}>
                {images.map((item, index) => (
                  <span key={index} title={item.title} >
                    <Image
                      className={styles.icon}
                      src={item.src}
                      alt="icons"
                      width={25}
                      height={25}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.devContainer}>
            <strong>Desenvolvedores</strong>
            <div className={styles.box}>
              {devNames.map((item, index) => (
                <label key={index} title={item.git}>
                  - {item.title}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}




export default Footer