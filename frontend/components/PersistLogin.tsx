"use client"

import useRefreshToken from "@/hooks/use-refresh-token"
import useAuth from "@/hooks/use-auth"
import { useState, useEffect } from 'react'

type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const PersistLogin = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()

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
    }, [auth?.accessToken, refresh])

    return (
        <>
            {!persist ? (children
            ) : ( isLoading) ? (<p>Loading...</p>
            ) : ( children || <div>No content available.</div>)}
        </>
    )
}


export default PersistLogin