"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { useMutation } from '@tanstack/react-query'
import { Button } from "@/components/ui/Button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { LoginRequest, LoginValidator, UserRequest, UserValidator } from "@/lib/validators/user"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "../../hooks/use-toast"
import { User } from "@/lib/types"
type FormData = z.infer<typeof UserValidator>

const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<LoginRequest>({
        resolver: zodResolver(LoginValidator),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = async (values: LoginRequest) => {
        const { email, password } = values
        try {
            const response = await axios.post((process.env.SERVER_URL, '/login'),
                JSON.stringify({ email: email, password: password }), {
                headers: { 'Content-Type': 'application/json' }
            })
            toast({
                title: 'Successful login.',
                variant: 'default'
            })

            router.push('/products')


        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}


export default LoginForm