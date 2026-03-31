'use client'

import Styles from './search.module.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { text } from 'stream/consumers'

const inputFields = [
    {
        type: "text",
        placeholder: "Busque por nome",
        value: "",
        variant: "default"
    },
]

const buttonFields = [
    {
        onClick: () => {},
        type: 'submit',
        text: "Buscar",
        variant: 'default'
    }
]

const SearchBox = () => {
    return (
        <div className={Styles.container}>
            <form>
                <Input
                    type={inputFields[0].type}
                    onChange={() => { }}
                    placeholder=''
                    variant={inputFields[0].variant}
                    value={inputFields[0].value}
                />
                <Button
                    onClick={buttonFields[0].onClick}
                    type={buttonFields[0].type}
                    text={buttonFields[0].text}
                    variant={buttonFields[0].variant}
                />
            </form>
        </div>
    )
}

export default SearchBox;