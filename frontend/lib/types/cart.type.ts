import { ProductResponse } from "./product.type";
import { UserFormType } from "./user.type";


export type CartType = {
  id?: string;
  userId?: string;
  user?: UserFormType;
  clothingId: number;
  clothing?: ProductResponse;
  quantity: number;
  createdAt?: Date;
};


export type CartItemProps = {
  name: string | undefined, 
  id: string, 
  price: number | undefined, 
  onCheck: (id: string) => void, 
  onUncheck:(id: string) => void, 
  quantity: number
};