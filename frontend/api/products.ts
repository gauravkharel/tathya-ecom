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
    refetchOnWindowFocus: false
  })
}


