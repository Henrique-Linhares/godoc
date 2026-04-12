import styles from "./footer.module.css"
import Image from "next/image"

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.itemBox}>
                <div className={styles.logo}>
                    <Image src={'/godoc_logo.png'} alt="Godoc" width={250} height={250} />
                </div>
                <div className={styles.contacContainer}>
                    HELLO
                </div>
                <div className={styles.suportContainer}>
                    <span>hlinhares453@gmail.com</span>
                    <span>guihhsoaress@gmail.com</span>
                    <span>(16) 99353-6708</span>
                </div>
                <div className={styles.devContainer}>
                    <span className={styles.item}>Henrique Linhares </span>
                    <span className={styles.item}>Guilherme Soares</span>
                    <span className={styles.item}>Kaique Santos</span>
                    <span className={styles.item}>Tatiana Silva</span>
                    <span className={styles.item}> Victor Lemos</span>
                </div>
            </div>
        </div>
    )
}

export default Footer