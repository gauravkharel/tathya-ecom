import { z } from "zod";

export const OrderStatusEnum = z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]);
export const PaymentStatusEnum = z.enum(["PENDING", "PAID", "FAILED"]);
export const PaymentMethodEnum = z.enum(["ESEWA", "BANK_TRANSFER"]);

export const MAX_UPLOAD_SIZE = 5000000;  // 5MB
export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export interface ErrorResponse {
  status: number;
  data: string;
}
