import type { Metadata } from "next";
import PersistLogin from "@/components/PersistLogin";
import AuthProviders from "@/providers/AuthProvider";
import Providers from "@/providers/QueryProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export const metadata: Metadata = {
    title: "Products",
    description: "Browse the next best thing.",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AuthProviders>
                <Providers>
                    <Navbar />
                    <div className='container max-w-7xl mx-auto h-full pt-12 '>
                        <PersistLogin>
                            {/* @ts-ignore */}
                            {children}
                        </PersistLogin>
                    </div>
                    <Toaster />

                </Providers>
            </AuthProviders>
        </>

    );
}
