import styles from './form.module.css'
import Input from '../../Button/Input/Input';

function Form() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    }

    const compFields = [
        {
            id: "email",
            type: "text",
            placeholder: "Email",
            value: "",
            variant: "default"
        }, {

        }
    ]
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <Input
                    type={compFields[0].type}
                    onChange={(e) => setEmail(e.target.value)}
                    variant={compFields[0].variant}
                    value={email}
                    placeholder="" />
            </form>
        </div>
    )
}