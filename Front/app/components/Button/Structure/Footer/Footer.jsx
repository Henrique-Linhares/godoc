import styles from "./footer.module.css"

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.itemBox}>
                <div className={styles.logo}>
                </div>
                <div className={styles.contacContainer}>
                </div>
                <div className={styles.suportContainer}>
                    <span>hlinhares453@gmail.com</span>
                    <span>guihhsoaress@gmail.com</span>
                    <span>(16) 99353-6708</span>
                </div>
                <div className={styles.devContainer}>
                    <span>Henrique Linhares </span>
                    <span>Guilherme Soares</span>
                    <span>Kaique Santos</span>
                    <span>Tatiana Silva</span>
                    <span> Victor Lemos</span>
                </div>
            </div>
        </div>
    )
}

export default Footer