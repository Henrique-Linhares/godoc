import "./Input.css"

const Input = ({ data, type, onChange, placeholder, variant, value = "default" }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            className={`input input-${variant}`}
            placeholder={placeholder}
            balue={value}
        ></input>
    )
}

export default Input