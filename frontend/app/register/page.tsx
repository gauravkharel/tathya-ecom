import { RegsiterUserForm } from "@/components/auth/Register"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import Image from "next/image"
import MainLogo from '../../public/logo.svg'
import Link from "next/link"


const page = ({ }) => {
  return (
    <div className="flex justify-center align-middle">
      <Card className="w-[400px] md:w-1/2 p-4 m-4">
        <div className="flex justify-center align-middle visible sm:visible ">
          <Image
            priority
            src={MainLogo}
            alt='logo'
            width={50}
            height={50}
          />
        </div>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>To be part of it.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegsiterUserForm />
        </CardContent>
        <CardFooter>
          <p>Already our family? <Link href="login" className="text-blue-400"> Login here</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page