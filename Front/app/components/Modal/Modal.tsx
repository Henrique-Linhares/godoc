'use client'

import Button from '../Button/Button/Button'
import Input from '../Input/Input'
import styles from './page.module.css'
import { useState } from "react"

interface ModalProps {
    setOpenModal: (value: boolean) => void
}

export function Modal({ setOpenModal }: ModalProps) {

    const [email, setEmail] = useState('')

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
        <div className={styles.overlay}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <span>Formulario para Agendamento do Henrique</span>
                        <Input
                            type={'text'}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={'default'}
                            value={email}
                            placeholder=""
                        />


                        <Button
                            onClick={() => setOpenModal(false) }
                            text={'clicar'}
                            type='submit'
                            variant={'default'}
                        />

                    </form>
                </div>
            </div>
        </div>
    )

}