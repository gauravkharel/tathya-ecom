import LoginForm from "@/components/auth/Login"
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
interface pageProps {

}

const page = ({ }) => {
    return (
        <div className="flex flex-row gap-4">
            <Card className="w-[2/4]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Manage what is worthy.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <p>Have a account? Login Here</p>
                </CardFooter>
            </Card>
            <Card className="w-[2/4] rounded-lg">
                <Image 
                    sizes="70vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }} src={Banner} alt="just another banner" />
            </Card>
        </div>
    )
}

export default page