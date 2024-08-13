import type { Metadata } from "next";
import PersistLogin from "@/components/PersistLogin";
import AuthProviders from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { CartProvider } from "@/providers/CartProvider";

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
            <AuthProviders>
                <CartProvider>
                    <Navbar />
                    <div className='container max-w-7xl mx-auto h-full pt-2 '>
                        <PersistLogin>
                            {/* @ts-ignore */}
                            {children}
                        </PersistLogin>
                    </div>
                    <Toaster />
                </CartProvider>
            </AuthProviders>
    );
}