import Title from "@/components/ui/Title";
import { FC } from "react";

interface HeaderProps {
    
}
 
const Header: FC<HeaderProps> = () => {
    return ( <div className="bg-gray-100 px-[200px] py-8">
            <span className="text-xl font-medium">Products</span>
    </div>);
}
 
export default Header;