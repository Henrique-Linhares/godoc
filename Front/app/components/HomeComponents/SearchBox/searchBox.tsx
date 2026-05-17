'use client'

import Styles from './search.module.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button/Button'
import { useState } from 'react'

//Search Provider Import
import { useSearch } from '@/context/Search'
import { style } from 'motion/react-client'


const inputFields = [
    {
        type: "text",
        placeholder: "Busque por nome",
        value: "",
        variant: "pesquisar"
    },
]

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
}

const SearchBox = () => {

    const { search, setSearch } = useSearch()

    return (
        <div className={Styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={Styles.formBox}>
                    <div className={Styles.titleBox}>        
                        <span>Pesquisar</span>
                    </div>

                    <Input
                        type={inputFields[0].type}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='Nome ou Especialidade'
                        variant={inputFields[0].variant}
                        value={search}
                    />
                </div>
            </form >
        </div >
    )
}

export default SearchBox;