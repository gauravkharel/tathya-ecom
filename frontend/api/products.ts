import useAxiosPrivate from "@/hooks/use-axios-interceptor";
import { ProductAPIType } from "@/lib/validators/product";
import { useQuery } from "@tanstack/react-query";

const Endpoint = "products";

export function useGetProducts() {
  const axiosPrivate = useAxiosPrivate();

  const getProducts = async () => {
    const response = await axiosPrivate.get<ProductAPIType[]>(Endpoint);
    return response.data;

  }

  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
}
