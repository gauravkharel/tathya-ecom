import { z } from "zod";

const OrderStatusEnum = z.enum([
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]);
const PaymentStatusEnum = z.enum(["PENDING", "PAID", "FAILED"]);
const PaymentMethodEnum = z.enum(["ESEWA", "BANK_TRANSFER"]);

export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  clothingId: z.number().int(),
  quantity: z.number().int().min(1),
  orderDate: z.date().default(() => new Date()),
  shippingAddress: z.string().min(1),
  billingAddress: z.string().optional(),
  orderStatus: OrderStatusEnum.default("PENDING"),
  paymentStatus: PaymentStatusEnum.default("PENDING"),
  paymentMethod: PaymentMethodEnum,
  totalPrice: z.number().positive(),
  taxAmount: z.number().positive(),
  shippingCost: z.number().positive(),
  discountAmount: z.number().positive().optional(),
  trackingNumber: z.string().optional(),
  estimatedDeliveryDate: z.date().optional(),
  comments: z.string().optional(),
});

export type OrderType = z.infer<typeof OrderSchema>;
