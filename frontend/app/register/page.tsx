import { RegsiterUserForm } from "@/components/auth/Register"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

const page = ({ }) => {
  return (
    <div>
      <Card className="w-1/2 p-4 m-4">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>To be part of it.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegsiterUserForm />
        </CardContent>
        <CardFooter>
          <p>Have a account? Login Here</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page