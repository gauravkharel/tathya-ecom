import UserProfile from "@/components/profile/UserProfile";
import { FunctionComponent } from "react";

interface pageProps {

}

const page: FunctionComponent<pageProps> = () => {
    return (
        <>
            <UserProfile />
        </>
    );
}

export default page;