import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../types/common.types";

export const ProductSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  description: z.string(),
  price: z.coerce.number().nonnegative(),
  brand: z.string().optional(),
  images: z.object({
    image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  }).optional(),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
