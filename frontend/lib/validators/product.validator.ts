import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../types/common.types";
import { serialize } from "v8";

export const ProductSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  description: z.string(),
  price: z.coerce.number().nonnegative(),
  brand: z.string().optional(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File), // Validate that it's a File object
        name: z.string(),
        type: z.string().refine((fileType) => ACCEPTED_IMAGE_TYPES.includes(fileType), {
          message: "Unsupported file type",
        }),
        size: z.number().refine((size) => size <= MAX_FILE_SIZE, {
          message: `File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
        }),
      })
    )
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
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
