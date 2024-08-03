"use client"

import { AuthContextType, AuthType } from "@/lib/types"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<AuthContextType | null>({
    auth: { email: "", accessToken: "" },
    setAuth: () => { },
    persist: false,
    setPersist: () => { },
    clearAuth: () => { }
})

type PersistState = boolean;


const AuthProviders = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthType >({ email: "", accessToken: "" })
    const [persist, setPersist] = useState<PersistState>(false) ;
    useEffect(() => {
        if (typeof window !== "undefined") { 
          const storedPersist = localStorage.getItem("persist")
          if (storedPersist) {
            setPersist(JSON.parse(storedPersist) as PersistState)
          }
        }
      }, [auth])
    
      const clearAuth = () => {
        setAuth({ email: "", accessToken: "" })
        setPersist(false)
        localStorage.removeItem("persist")
        localStorage.removeItem("auth")
        localStorage.removeItem("jwt")
        
    }
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, clearAuth }}>
            {children}
        </AuthContext.Provider>)
}

export default AuthProviders