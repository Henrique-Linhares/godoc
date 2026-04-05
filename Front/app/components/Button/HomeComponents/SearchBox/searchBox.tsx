'use client'

import Styles from './search.module.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { useState } from 'react'
import { useSearch } from '@/app/components/Search.tsx/Search'



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

const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

const SearchBox = () => {

    const {search, setSearch}= useSearch()

    return (
        <div className={Styles.container}>
            <form onSubmit={handleSubmit}>
                <Input
                    type={inputFields[0].type}
                    onChange={(e) => {setSearch(e.target.value)}}
                    placeholder=''
                    variant={inputFields[0].variant}
                    value={search}
                />
                <Button
                    onClick={buttonFields[0].onClick}
                    type="submit"
                    text={buttonFields[0].text}
                    variant={buttonFields[0].variant}
                />
            </form>
        </div>
    )
}

export default SearchBox;