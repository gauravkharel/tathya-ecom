"use client"

import { AuthContextType, AuthType } from "@/lib/types";
import { createContext, useState } from "react"

export const AuthContext = createContext<AuthContextType | null>({
    auth: { email: "", accessToken: "" },
    setAuth: () => { },
    persist: false,
    setPersist: () => { },
});

type PersistState = boolean;


const AuthProviders = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthType >({ email: "", accessToken: "" });
    const [persist, setPersist] = useState<PersistState>(JSON.parse(localStorage.getItem("persist") || 'false') as PersistState);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProviders