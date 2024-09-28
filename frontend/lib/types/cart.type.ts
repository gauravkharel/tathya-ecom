import { UserFormType } from "../validators/user";
import { ProductFormType } from "../validators/product";

export type CartType = {
  id?: string;
  userId?: string;
  user?: UserFormType;
  clothingId: number;
  clothing?: ProductFormType;
  quantity: number;
  createdAt?: Date;
};
