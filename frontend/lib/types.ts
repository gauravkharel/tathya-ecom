export type User = {
  id: Number;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
};

export interface AuthType {
  email?: string;
  accessToken?: string;
  roles?: number,
  password?: string;
}

export interface AuthContextType {
  auth: AuthType;
}

export interface ErrorResponse {
    status: number;
    data: string;
}

export interface ProductType{
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brandId: number;
  genderId: number;
  categoryId: number;
}
  
