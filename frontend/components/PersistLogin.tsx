"use client"

import useRefreshToken from "@/hooks/use-refresh-token"
import useAuth from "@/hooks/use-auth"
import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { title } from "process"

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const {toast} = useToast()
    
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
        return () =>{
             isMounted = false;
            }
    }, [])


    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <>Refetched</>
            }
        </>
    )
}


export default PersistLogin