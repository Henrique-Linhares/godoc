"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
    user: string;
    email: string;
};

type ProviderType = {
    user: UserData | null;
    logged: boolean;
    login: (userData: UserData) => void;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<ProviderType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {

    //Autentication
    const [user, setUser] = useState<UserData | null>(null);
    const [logged, setLogged] = useState(false);

    function login(userData: UserData) {
        setUser(userData);
        setLogged(true);
    }

    function logout() {
        setUser(null);
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{ user, logged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}