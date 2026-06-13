"use client";


import { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
    email: string;
    name: string;
    tipo: String
};

type ProviderType = {
    user: UserData | null;
    logged: boolean;
    login: (userData: UserData) => void;
    logout: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<ProviderType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserData | null>(null);
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true)



    async function login(userData: UserData) {
        setUser(userData);
        const preUser = { name: 'User' }

        const storedUser = localStorage.getItem('user')
        const email = JSON.parse(storedUser).email
        setUser({
            ...userData,
            name: email
        });
        setLogged(true);
    }

    function logout() {
        setLoading(true)
        setUser(null);
        setLogged(false);
        localStorage.clear()
        setLoading(false)

    }

    return (
        <AuthContext.Provider value={{ user, logged, login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

//Custom Hook to autentication

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}