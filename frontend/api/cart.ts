import { CartType } from "@/lib/type/cart.type";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "./axios";

const Endpoint = 'carts';

export function useGetCart() {
  const getCart = async () => {
    const response = await axiosPrivate.get<CartType[]>(Endpoint);
    return response.data;
  }
  return useQuery({
    queryKey: [Endpoint],
    queryFn: getCart,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}

export function useAddProductToCart(options?: {
  onSuccess?: (data: CartType) => void;
  onError?: (error: any) => void;
}): UseMutationResult<CartType, Error, CartType> {
  const addProduct = async (product: CartType) => {
    const { clothingId, userId, quantity } = product;
    const response = await axiosPrivate.post<CartType>(Endpoint,
      { clothingId, userId, quantity },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    console.log('data: ', response.data);
    return response.data;
  }

  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    }
  });
}


export function useDeleteCartItems(options?: {
  onSuccess?: (data: { count: number }) => void;
  onError?: (error: any) => void;
}): UseMutationResult<{ count: number }, Error, { cartIds: string[] }> {
  const deleteCartItems = async ({ cartIds }: { cartIds: string[] }) => {
    const response = await axiosPrivate.delete<{ count: number }>(Endpoint, {
      data: { cartIds }, // Sending data in the request body
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  }

  return useMutation({
    mutationFn: deleteCartItems,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    }
  });
}
