import LoginForm, { BackgroundImage } from "@/components/auth/Login"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"
import Image from "next/image"
import Banner from '../../public/banne.jpg'
import Link from "next/link"
import MainLogo from '../../public/logo.svg'

interface pageProps {

}

const page = ({ }) => {
    return (
        <div className="flex flex-row gap-4 divide-x  p-10">
            <Card className=" w-[1000px] lg:w-1/2 lg:p-10">
                <Card className="border-none flex flex-col justify-normal align-middle">
                    <div className="px-[300px] visible sm:visible ">
                        <Image
                            priority
                            src={MainLogo}
                            alt='logo'
                            width={50}
                            height={50}
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Shop with peace</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                    <CardFooter>
                        <p>Not a family yet? <Link href="register" className="text-blue-400"> Please here is the adoption letter</Link></p>
                    </CardFooter>
                </Card>
            </Card>
            <BackgroundImage />
        </div>
    )
}

export default page