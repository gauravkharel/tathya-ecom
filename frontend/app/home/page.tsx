import { FC } from "react";

interface pageProps {
    
}
 
const page: FC<pageProps> = () => {
    return ( <div className="flex flex-row justify-center align-middle">
            <h2>
                Home sweet home
            </h2>
    </div>);
}
 
export default page;