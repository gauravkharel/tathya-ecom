import { CartType } from "@/lib/type/cart.type";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import useAxiosPrivate from "@/hooks/use-axios-interceptor";

const Endpoint = 'carts';

export function useGetCart() {
  const axiosPrivate = useAxiosPrivate();
  const getCart = async () => {
    const response = await axiosPrivate.get<CartType[]>(Endpoint);
    return response.data;
  }
  return useQuery({
    queryKey: [Endpoint],
    queryFn: getCart,
    refetchOnWindowFocus: true,
    staleTime: 0
  })
}

export function useAddProductToCart(options?: {
  onSuccess?: (data: CartType) => void;
  onError?: (error: any) => void;
}): UseMutationResult<CartType, Error, CartType> {
  const axiosPrivate = useAxiosPrivate();

  const addProduct = async (product: CartType) => {
    const { clothingId, quantity } = product;
    // console.log("From useAddProduct", clothingId, quantity)
    const response = await axiosPrivate.post<CartType>(Endpoint,
    { clothingId, quantity },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    return response.data;
  }
  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      // @ts-ignore
      queryClient.invalidateQueries(Endpoint)
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
  const axiosPrivate = useAxiosPrivate();
  const deleteCartItems = async ({ cartIds }: { cartIds: string[] }) => {
    const response = await axiosPrivate.delete<{ count: number }>(Endpoint, {
      data: { cartIds },
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  }

  return useMutation({
    mutationFn: deleteCartItems,
    onSuccess: (data) => {
      // @ts-ignore
      queryClient.invalidateQueries(Endpoint);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    }
  });
}
