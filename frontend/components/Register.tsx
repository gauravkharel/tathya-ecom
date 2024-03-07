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
import { UserRequest, UserValidator } from "@/lib/validators/user"
// import { signUpUserFn } from "@/lib/authApi"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { Router } from "next/router"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

type FormData = z.infer<typeof UserValidator>

export function RegsiterUserForm() {
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<UserRequest>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: UserRequest) => {
    console.log('registered values', values)
    const { firstname, lastname, email, password } = values

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/register`;
      console.log(url)
      // const url = 'http://localhost:3500/register'
      const response = await axios.post(
        url,
        JSON.stringify({ fname: firstname, lname: lastname, email: email, password: password }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast({
        title: `Welcome ${values.firstname}`,
        description: "You can now login with your credentials."
      })
      router.push('/login')


    } catch (err) {
      console.log(err)
      toast({
        //@ts-ignore
        title: err.name + ': ' + err.code,
        //@ts-ignore
        description: err.message,
        variant: 'destructive'
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name='firstname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* <FormField
          control={form.control}
          name='profileimageurl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input type="file" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
