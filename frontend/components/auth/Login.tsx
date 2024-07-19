"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { LoginRequest, LoginValidator } from "@/lib/validators/user"
import { useRouter } from 'next/navigation'
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
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        {isError && <div>{error?.message}</div>}
      </form>
    </Form>
  );
};

export default LoginForm;
