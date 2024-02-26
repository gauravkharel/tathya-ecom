"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { useMutation } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginRequest, LoginValidator, UserRequest, UserValidator } from "@/lib/validators/user"
import axios from "axios"

type FormData = z.infer<typeof UserValidator>

export function LoginForm() {
    const form = useForm<LoginRequest>({
        resolver: zodResolver(LoginValidator),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: LoginRequest) => {
        console.log('Login details',values)
        const { email, password } = values
        try {
            const response = await axios.post('http://localhost:3500/login',
                JSON.stringify({ email: email, password: password }), {
                headers: { 'Content-Type': 'application/json' }
            })
            console.log(JSON.stringify(response))
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
