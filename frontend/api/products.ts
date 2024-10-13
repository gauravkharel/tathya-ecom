import useAxiosPrivate from "@/hooks/use-axios-interceptor";
import { ProductResponse } from "@/lib/types";
import { PresignedUrlRequest, PresignedUrlResponse, ProductFormData } from "@/lib/validators/product.validator";
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

    const response = await axiosPrivate.get<ProductResponse[]>(`products?${params.toString()}`);
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
    const response = await axiosPrivate.get<ProductResponse>(`/products/${productId}`);
    return response.data;
  };

  return useQuery({
    queryKey: ['product', productId],
    queryFn: getProduct,
    // Only fetch if productId is not null or undefined
    enabled: !!productId,
  });
}


