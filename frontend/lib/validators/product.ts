import { z } from "zod"
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ProductValidator = z.object({
    name: z.string().min(2, {message: "Can't have your name with just two characters."}),
    description: z.string(),
    // productImageUrl: z.string().array().nonempty().max(4, {message: "Just 4 photos only"}),
    price: z.coerce.number().nonnegative(),
    brand: z.string().optional(),
    genderId: z.coerce.number().nonnegative().optional(),
    images: z.object({
      image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
    }).optional()
  })

  export type ProductType = z.infer<typeof ProductValidator>