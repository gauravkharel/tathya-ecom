import type { ProductType } from "../validators/product";
import type { UserRequest } from "../validators/user";

export type CartType = {
  id: string;
  userId: string;
  user: UserRequest;
  clothingId: number;
  clothing: ProductType;
  quantity: number;
  createdAt: Date;
};
