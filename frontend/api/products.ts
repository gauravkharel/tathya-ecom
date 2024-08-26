import useAxiosPrivate from "@/hooks/use-axios-interceptor";
import { ProductAPIType, ProductType } from "@/lib/validators/product";
import { useInfiniteQuery, useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";

const Endpoint = "products";

export interface GetProductsQueryParams {
  categories?: string[] | void
  brands?: string[]
}

export function useGetProducts({ categories = [], brands = [] }: GetProductsQueryParams) {
  const axiosPrivate = useAxiosPrivate();
  const getProducts = async ({ pageParam = 0 }) => {
    const params = new URLSearchParams({
      skip: pageParam.toString(),
      take: '10',
      ...(categories.length > 0 && { categories: categories.join(',') }),
      ...(brands.length > 0 && { brands: brands.join(',') }),
    })
    console.log('Categories from api',categories)
    const response = await axiosPrivate.get<ProductAPIType[]>(`products?${params.toString()}`);
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ['products', { categories, brands }],
    queryFn: getProducts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length * 10;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useGetProduct(productId: number) {
  const axiosPrivate = useAxiosPrivate();
  const getProduct = async () => {
    const response = await axiosPrivate.get<ProductAPIType>(`/products/${productId}`);
    return response.data;
  };

  return useQuery({
    queryKey: ['product', productId],
    queryFn: getProduct,
    // Only fetch if productId is not null or undefined
    enabled: !!productId,
  });
}

export function useAddNewProduct(options?: {
  onSuccess?: (data: ProductType) => void;
  onError?: (error: any) => void;
}): UseMutationResult<ProductType, Error, ProductType> {
  const axiosPrivate = useAxiosPrivate()
  const addProduct = async (data: ProductType) => {
    const { name, price, images, brand, description } = data;
    const response = await axiosPrivate.post<ProductType>(Endpoint,
      { name, price, images, brand, description },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
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

  })
}


export function useDeleteProduct(options?: {
  onSuccess?: (data: ProductAPIType) => void;
  onError?: (error: any) => void;
}): UseMutationResult<ProductAPIType, Error, ProductAPIType> {
  const axiosPrivate = useAxiosPrivate()
  const addProduct = async (data: ProductAPIType) => {
    const { id } = data;
    const response = await axiosPrivate.delete<ProductAPIType>(`products/${id}`
    )
    console.log('data: ', response.data)
    return response.data;
  }
  return useMutation({
    mutationFn: addProduct,
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

