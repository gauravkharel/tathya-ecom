import {z} from 'zod'

export const MAX_UPLOAD_SIZE = 5000000;
export const ACCEPTED_FILE_TYPES= ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
    profileimageurl: z.instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 5MB')
    .refine((file) => {
      return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'File must be a PNG')
  })

  export const LoginValidator =z.object({
    email: z.string().email(),
    password: z.string().min(10, {
      message: "Please atleast 10 characters."
    })
  })
  
  export type UserRequest = z.infer<typeof UserValidator>
  export type LoginRequest = z.infer<typeof LoginValidator>
