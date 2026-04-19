"use client"

import { ChangeEvent } from "react";


interface InputProps {

    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    variant: string;
    value: string

}

import styles from "./input.module.css"


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