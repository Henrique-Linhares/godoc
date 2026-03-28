"use client"

interface InputProps {

    type: string;
    onChange: () => void;
    placeholder: string;
    variant: string;
    value: string

}

import styles from "./input.module.css"

//import "./Input.css"



const Input = ({ type, onChange, placeholder, variant, value = "default" }: InputProps) => {
    return (
        <input
            type={type}
            onChange={onChange}
            className={`input ${styles[variant]}`}
            placeholder={placeholder}
            value={value}
        />
    );
};

export default Input;