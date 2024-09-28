import { z } from "zod";
import { OrderStatusEnum, PaymentStatusEnum, PaymentMethodEnum } from "../types/common.types";

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

export type OrderSchemaType = z.infer<typeof OrderSchema>;
