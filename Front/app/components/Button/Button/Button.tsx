
"use client";

import "@app/Button/Page.module.css"

interface ButtonProps {
    text: string;
    onClick: () => void;
    variant: string;
}

const Button = ({ onClick, text, variant = "default" }: ButtonProps) => {
    return (
            <button onClick={onClick} className={`btn btn-${variant}`}>{text}</button>
    )
}

export default Button;