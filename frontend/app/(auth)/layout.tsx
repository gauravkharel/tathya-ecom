import type { Metadata } from "next";
import PersistLogin from "@/components/PersistLogin";


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
            <PersistLogin />
            {children}
        </>

    );
}
