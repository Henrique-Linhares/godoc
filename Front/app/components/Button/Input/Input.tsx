"use client"

interface InputProps {

    type: string;
    onChange: () => void;
    placeholder: string;
    variant: string;
    value: string

}

//import "./Input.css"

const Input = ({ type, onChange, placeholder, variant, value = "default" }: InputProps) => {
    return (
        <input
            type={type}
            onChange={onChange}
            className={`input input-${variant}`}
            placeholder={placeholder}
            value={value}
        ></input>
    );
};

export default Input;