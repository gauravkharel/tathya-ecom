import {z} from 'zod'

export const UserValidator =z.object({
    firstname: z.string().min(2, {
      message: "Can't have your name with just two characters."
    }),
    lastname: z.string().min(2, {
      message: "Can't have your name with just two characters."
    }),
    email: z.string().email(),
    password: z.string().min(10, {
      message: "Please atleast 10 characters."
    }),
    profileimageurl: z.string().url()
  })

export type UserRequest = z.infer<typeof UserValidator>
