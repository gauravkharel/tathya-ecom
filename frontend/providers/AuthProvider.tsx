"use client"

import { AuthContextType, AuthType } from "@/lib/types";
import { createContext, useState } from "react"

export const AuthContext = createContext<{ auth: AuthType; setAuth: React.Dispatch<React.SetStateAction<AuthType>> }>({
    auth: { email: "", accessToken: "" },
    setAuth: () => {}
  });

const AuthProviders = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthType>();
    return (
        //@ts-ignore
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProviders