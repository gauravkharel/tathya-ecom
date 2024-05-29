import type { Metadata } from "next";
import PersistLogin from "@/components/PersistLogin";
import { LucideArrowLeft, LucideSmile } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import "../../globals.css"

export const metadata: Metadata = {
    title: "Manage Products",
    description: "New gen dashboard for new gen needs.",
};

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className=" w-full h-full">
                <div className="flex flex-col p-10 m-10 text-2xl font-bold text-medium">
                <Link href={'/products'}><Button><LucideArrowLeft></LucideArrowLeft> Back to Home</Button></Link>
                    Under development. Building on second iteration. 😃 🏝️
                </div>
            </div>
            {children}
        </>

    );
}
