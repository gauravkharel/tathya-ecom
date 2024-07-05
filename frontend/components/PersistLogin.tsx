"use client"

import useRefreshToken from "@/hooks/use-refresh-token"
import useAuth from "@/hooks/use-auth"
import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { AuthContextType } from "@/lib/types"
type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const PersistLogin = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()
    const { toast } = useToast()

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => {
            isMounted = false;
        }
    }, [])


    return (
        <>
            {!persist
                ? {children}
                : isLoading
                    ? <p>Loading...</p>
                    : {children}
            }
        </>
    )
}


export default PersistLogin