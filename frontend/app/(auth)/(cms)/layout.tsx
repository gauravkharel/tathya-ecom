import type { Metadata } from "next";
import PersistLogin from "@/components/PersistLogin";
import { LucideArrowLeft, LucideSmile } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import "../../globals.css"
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "Warehouse",
    description: "New gen dashboard for new gen needs.",
};

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row">
            <Sidebar />
            {/* <div className=" w-full h-full">
                <div className="flex flex-col p-10 m-10 text-2xl font-bold text-medium">
                    <Link href={'/products'}><Button><LucideArrowLeft></LucideArrowLeft> Back to Home</Button></Link>
                    Under development. Building on second iteration. 😃 🏝️
                </div>
            </div> */}
            <div className="p-6">

            dasohdahodh
            </div>
            {children}
        </div>

    );
}
