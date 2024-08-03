import useAxiosPrivate from "@/hooks/use-axios-interceptor";
import axios from "axios";
import { ProductType } from "@/lib/validators/product";
import { useQuery } from "@tanstack/react-query";
const Endpoint = "products";

export function useGetProducts(){
  const axiosPrivate = useAxiosPrivate();

  const getProducts = async(id:number) => {
    return (await axiosPrivate.get<ProductType[]>(Endpoint)).data
  }
  
  return useQuery({
    queryKey: ['products'],
    //@ts-ignore
    queryFn: getProducts,
<<<<<<< refs/remotes/origin/feat/cart
    refetchOnWindowFocus: false
=======
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}

export function useGetProduct(id:number){
const axiosPrivate = useAxiosPrivate()

  const getProduct = async () => {
    const response = await axiosPrivate.get<ProductAPIType>(`products/${id}`);
    console.log('data: ',  response.data)
    return response.data;
  }

  return useQuery({
    queryKey: ['product'],
    queryFn: getProduct,
    refetchOnWindowFocus: true,
    
  })
}

export function useAddNewProduct(options?: {
  onSuccess?: (data: ProductType) => void;
  onError?: (error: any) => void;
}): UseMutationResult<ProductType, Error, ProductType> {
  const axiosPrivate = useAxiosPrivate()

  const addProduct = async (data: ProductType) => {
    const { name, price, images, brand, genderId, description } = data;
    const response = await axiosPrivate.post<ProductType>(Endpoint,
      { name, price, images, brand, genderId, description },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    console.log('data: ', response.data)
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
>>>>>>> local
  })
}


<<<<<<< refs/remotes/origin/feat/cart
=======
export function useDeleteProduct(options?: {
  onSuccess?: (data: ProductAPIType) => void;
  onError?: (error: any) => void;
}): UseMutationResult<ProductAPIType, Error, ProductAPIType> {
  const axiosPrivate = useAxiosPrivate()

  const deleteProduct = async (data: ProductAPIType) => {
    const { id } = data;
    const response = await axiosPrivate.delete<ProductAPIType>(`products/${id}`
    )
    console.log('data: ', response.data)
    return response.data;
  }

  return useMutation({
    mutationFn: deleteProduct,
    throwOnError: true,
    onSuccess: (data) => {
      options?.onSuccess?.(data);

    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    }
  })
}

>>>>>>> local
