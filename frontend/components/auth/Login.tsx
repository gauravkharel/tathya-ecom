"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { LoginRequest, LoginValidator, UserRequest, UserValidator } from "@/lib/validators/user"

import { useToast } from "../../hooks/use-toast"
import useAuth from "@/hooks/use-auth"
import axios from "@/api/axios"
import { useState } from "react"
import { ErrorResponse } from "@/lib/types"
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm = () => {
    console.log("email: wokeantro@gmail.com", "password: 2817928913131")
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const from = searchParams.get('from') || '/products';
    const { toast } = useToast()
    const form = useForm<LoginRequest>({
        resolver: zodResolver(LoginValidator),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { auth, setAuth } = useAuth()
    // const [errMsg, setErrMsg] = useState('');


    const onSubmit = async (values: LoginRequest) => {
        const { email, password } = values
        try {
            const response = await axios.post(('/login'),
                JSON.stringify({ email, password }), 
                {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
                }
            )


            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            toast({
                title: 'Successful login.',
                variant: 'default'
            })

            setAuth({ email, accessToken, roles });

            router.push('/products')

        } catch (err) {
            //@ts-ignore
            const { status, data } = err.response;
            toast({
                description: data,
                variant: 'destructive'
            })
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
                                <Input type="email" placeholder="Your email please" {...field} />
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
                                <Input type="password" placeholder="Your password please" {...field} />
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