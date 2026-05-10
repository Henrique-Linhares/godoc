"use client";



import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserData = {
    senha: string;
    email: string;
    name?: string
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


    useEffect(() => {

        setLoading(false)
        setLogged(false)
        setLoading(false)

    }, [])

   async  function login(userData: UserData) {
        setUser(userData);
        setLogged(true);
    }

    function logout() {
        setUser(null);
        setLogged(false);

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