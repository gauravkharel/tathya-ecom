import { z } from "zod";
import { LoginValidator, UserValidator } from "../validators";
import { AddressType } from "./address.type";

export type UserFormType = z.infer<typeof UserValidator>;
export type LoginRequest = z.infer<typeof LoginValidator>;

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber?: number;
  profileImageUrl?: string;
  address?: AddressType;
};
