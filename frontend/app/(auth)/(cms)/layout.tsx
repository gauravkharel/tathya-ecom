import type { Metadata } from "next";
import "../../globals.css"
import Sidebar from "@/components/admin/layout/Sidebar";
import Header from "@/components/admin/layout/Header";

export const metadata: Metadata = {
    title: `Warehouse`,
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
            <div className="flex flex-col  w-full">
                <Header />
                <div className="px-[200px] text-lg py-6">
                    {children}
                </div>
            </div>
        </div>

    );
}
