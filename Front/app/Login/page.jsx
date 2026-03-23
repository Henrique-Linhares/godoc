import Button from '../components/Button'
import Input from '../components/Button/Input/Input'

const compFields = [
    {
        id: "email",
        type: "text",
        onChange: () => { },
        placeholder: "default",
        value: ""
    },
    {
        id: "senha",
        type: "passworld",
        onChange: () => { },
        placeholder: "default",
        value: ""
    }
]


const Login = () => {

    return (
        <>
            '<form>
                <div className="login-container">
                    {/*
                    <span className='title'></span>
                    <Input
                        type={compFields[0].type}
                        onChange={}
                        placeholder={compFields[0].placeholder}
                        variant={compFields[0].variant}
                        value={compFields[0].value} />

<!--------!> */}
                    {compFields.map((item, index) => {
                        <Input
                            type={item.type}
                            onChange={item.onChange}
                            placeholder={item.placeholder}
                            variant={item.variant}
                            value={item.value}y
                        />
                    })}
                </div>
            </form >
        </>
    )
}