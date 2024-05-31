"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { useMutation } from '@tanstack/react-query'
import { Button } from "@/components/ui/Button"
import {
  Form
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { UserRequest, UserValidator } from "@/lib/validators/user"
import axios from "axios"
import { useToast } from "../../hooks/use-toast"
import { useRouter } from "next/navigation"
import FormInput from "../form/FormInput"
import { useRegister } from "@/api/auth"

type FormData = z.infer<typeof UserValidator>

const formObj = [
  {
    name: 'firstname',
    label: 'Firstname',
    placeholder: 'Enter your name here.',
    type: 'text'
  },
  {
    name: 'lastname',
    label: 'Lastname',
    placeholder: 'Enter your last name here.',
    type: 'text'
  },
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

  const {mutate: register, isPending, isError, error} = useRegister()

  const onSubmit = async (values: UserRequest) => {
    const { firstname, lastname, email, password } = values
    register({ firstname, lastname, email, password })
    router.push('/login')
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
        )
        }
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
