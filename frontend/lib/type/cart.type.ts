import type { ProductAPIType, ProductType } from "../validators/product";
import type { UserRequest } from "../validators/user";

export type CartType = {
  id?: string;
  userId?: string;
  user?: UserRequest;
  clothingId?: number;
  clothing?: ProductAPIType;
  quantity?: number;
  createdAt?: Date;
};
