"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { useRouter } from 'next/navigation'
import FormInput from "../form/FormInput"
import { useLogin } from "@/api/auth"
import { Card, CardContent } from "../ui/Card"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { LoginRequest } from "@/lib/types"
import { LoginValidator } from "@/lib/validators"

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
  console.log("email: wokeantro@outlook.com", "password: 2817928913131")
  const router = useRouter();
  const {toast} = useToast()
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: ""
    }
  })

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

  const onSubmit = async (values: LoginRequest) => {
    const { email, password } = values;
    login({ email, password });
  };

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
        )
        }
        <Button type="submit" disabled={isPending}>{isPending ? 'Logging in...' : 'Login'}</Button>
        {isError && <div>{error?.message}</div>}
      </form>
    </Form>
  );
};

export const BackgroundImage = () => {
  return (
    <div className="bg-scroll bg-bg-login bg-cover opacity-75 w-1/2 rounded-lg invisible sm:invisible md:invisible lg:visible " >
    </div>
  )
}

export default LoginForm;
