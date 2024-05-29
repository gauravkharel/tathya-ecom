import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "@/lib/types";
import { axiosPrivate } from "@/api/axios";

const Endpoint = "/products";

const fetchProducts = async()=> {
  const controller = new AbortController();
  try {
    const { data } = await axiosPrivate.get(Endpoint, {
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      throw error;
    }
  }
}

export function useGetProducts(): UseQueryResult<ProductType[], Error> {
    return useQuery<ProductType[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        refetchOnWindowFocus: false, // Adjust based on your use case
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
