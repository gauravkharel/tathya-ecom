import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "../types/common.types";

export const UserValidator = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters long." }),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters long." }),
  email: z.string().email(),
  password: z.string().min(10, { message: "Password must be at least 10 characters long." }),
  profileimageurl: z.instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, "File size must be less than 5MB.")
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), "File format must be valid."),
});

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(10, { message: "Password must be at least 10 characters long." }),
});

export type UserValidatorType = z.infer<typeof UserValidator>;
export type LoginValidatorType = z.infer<typeof LoginValidator>;
