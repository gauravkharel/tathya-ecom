"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import {
  Form
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { LoginRequest, LoginValidator } from "@/lib/validators/user"
import { useRouter } from 'next/navigation';
import FormInput from "../form/FormInput"
import { useLogin } from "@/api/auth"

const formObj = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email here.',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: '*********',
    type: 'password'
  }
]

const LoginForm = () => {
  console.log("email: wokeantro@gmail.com", "password: 2817928913131")
  const router = useRouter();
<<<<<<< refs/remotes/origin/feat/cart
=======
  const {toast} = useToast()
>>>>>>> local
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: ""
    }
  })
<<<<<<< refs/remotes/origin/feat/cart
  const { mutate: login, isPending, isError, error } = useLogin();
=======

  const { mutate: login, isPending, isError, error } = useLogin({
    onSuccess: () => {
      router.push('/products')
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: `${error}`,
        description: `${error.response.data}`,
        variant: 'destructive'
      })
    }
  });
>>>>>>> local

  const onSubmit = async (values: LoginRequest) => {
    const { email, password } = values
    login({ email, password })
    router.push('/products')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formObj.map(formEle =>
          <FormInput
            key={formEle.name}
            control={form.control}
            name={formEle.name}
            label={formEle.label}
          >
            <Input type={formEle.type} placeholder={formEle.placeholder} />
          </FormInput>
<<<<<<< refs/remotes/origin/feat/cart
        )
        }
        <Button type="submit" disabled={isPending}>{isPending ? 'Logging in...' : 'Login'}</Button>
        {isError && <div>{error?.message}</div>}
=======
        )}
        <Button className="bg-blue-600 hover:bg-blue-500" type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        {/* @ts-ignore */}
        {isError && <div className=" text-red-700">{error?.response?.data}</div>}
>>>>>>> local
      </form>
    </Form>
  )
}

export default LoginForm