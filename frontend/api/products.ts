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

export function useCreateProduct(options?: {
  onSuccess?: (data: ProductResponse) => void;
  onError?: (error: any) => void;
}): UseMutationResult<ProductResponse, Error, ProductFormData> {
  const axiosPrivate = useAxiosPrivate();

  const createProduct = async (data: ProductFormData) => {
    // Send metadata to get pre-signed URLs
    const imageRequests: PresignedUrlRequest[] = data.images.map(image => ({
      fileName: image.name, 
      fileType: image.type || "image/jpeg",
    }));
    console.log(imageRequests)
    const presignedUrlsResponse = await axiosPrivate.post<PresignedUrlResponse[]>(`/products/presigned-urls`, imageRequests);
    
    //Upload images to pre-signed URLs
    await Promise.all(
      presignedUrlsResponse.data.map((urlResponse, index) => {
        const file = data.images[index]
        return axiosPrivate.put(urlResponse.presignedUrl, file, {
          headers: { "Content-Type": file.type || "image/jpeg" } 
        });
      })
    );

    // Submit final product with image URLs
    const finalProduct = {
      ...data,
      images: presignedUrlsResponse.data.map(urlRes => urlRes.imageUrl),
    };

    const response = await axiosPrivate.post<ProductResponse>(`/products`, finalProduct);
    return response.data;
  };

  return useMutation({
    mutationFn: createProduct,
    throwOnError: true,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    }
  });
}


export function useDeleteProduct(options?: {
  onSuccess?: (data: ProductResponse) => void;
  onError?: (error: any) => void;
}): UseMutationResult<ProductResponse, Error, ProductResponse> {
  const axiosPrivate = useAxiosPrivate()
  const addProduct = async (data: ProductResponse) => {
    const { id } = data;
    const response = await axiosPrivate.delete<ProductResponse>(`products/${id}`
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

