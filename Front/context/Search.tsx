"use client";

import { createContext, useContext, useState, ReactNode } from "react";


type SearchTypes ={
    search: String,
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

type SeachProviderProps = {
    children: ReactNode;
};

const SearchContext = createContext<SearchTypes | undefined>(undefined)

export default function SearchProvider( {children} : SeachProviderProps) {

    const [search, setSearch] = useState('')
    
    return (
        <SearchContext value={{ search, setSearch }}>
            {children}
        </SearchContext>
    )
}

export function useSearch() {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("Erro ao usar o provider");
    }

    return context;
}