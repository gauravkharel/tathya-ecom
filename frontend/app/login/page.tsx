import { LoginForm } from "@/components/auth/Login"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"

interface pageProps {

}

const page = ({ }) => {
    return (
        <div>
            <Card className="w-[300px]">
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
        </div>
    )
}

export default page