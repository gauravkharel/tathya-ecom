export interface ProductResponse {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  brand?: { name?: string };
  category?: { name?: string };
}
