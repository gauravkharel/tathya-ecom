"use client";
import { useContext } from "react";
import { LogOutIcon } from "lucide-react";
import { useLogout } from "@/api/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

interface LogoutProps { }

const Logout: React.FC<LogoutProps> = () => {
    const router = useRouter();
    const { mutate } = useLogout();
    const authContext = useContext(AuthContext);

    const handleLogout = async () => {
        mutate(undefined, {
            onSuccess: () => {
                authContext?.clearAuth();
                router.push('/login');
            },
            onError: (error) => {
                console.error('Logout failed:', error);
            },
        });
    };

    return (
        <LogOutIcon onClick={handleLogout} size={28} />
    );
};

export default Logout;
