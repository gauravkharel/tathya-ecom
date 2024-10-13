import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../types/common.types";

export const ProductSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  description: z.string(),
  price: z.coerce.number().nonnegative(),
  brand: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required").max(5, "Maximum 5 images allowed"),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

export interface PresignedUrlResponse {
  presignedUrl: string;
  imageUrl: string;
}

export interface PresignedUrlRequest {
  fileName: string;
  fileType: string;
}