"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React from "react"

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>)
}

export default Providers