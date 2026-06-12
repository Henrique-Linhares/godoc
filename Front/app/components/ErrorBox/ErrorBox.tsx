import styles from './Error.module.css'

interface ErrorProps {
    serchitem: string
}

const ErrorBox = ({ serchitem }: ErrorProps) => {
    return (
        <div className={styles.ErrorBox}>
            <span>Nenhum {serchitem} encontrado</span>
        </div>
    )
}

export default ErrorBox