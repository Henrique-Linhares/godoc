
"use client";

import styles from "./page.module.css"

interface ButtonProps {
    text: string;
    onClick: () => void;
    variant: string;
    type: string
}

const Button = ({ onClick, type,  text, variant = "default" }: ButtonProps) => {
    return (
            <button onClick={onClick} className={`btn ${styles[variant]}`}>{text}</button>
    )
}

export default Button;