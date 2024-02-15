import { ProfileForm } from "@/components/exampleform"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface pageProps {

}

const page = ({ }) => {
  return (
    <div>
<Card className="w-[300px]">
  <CardHeader>
    <CardTitle>Sign Up</CardTitle>
    <CardDescription>To be part of it.</CardDescription>
  </CardHeader>
  <CardContent>
      <ProfileForm />
  </CardContent>
  <CardFooter>
    <p>Have a account? Login Here</p>
  </CardFooter>
</Card>
    </div>
  )
}

export default page