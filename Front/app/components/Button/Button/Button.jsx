
import "./Button.css"

"use client";

const Button = ({ onClick, text, variant = "default" }) => {
    return (
            <button onClick={onClick} className={`btn btn-${variant}`}>{text}</button>
    )
}

export default Button