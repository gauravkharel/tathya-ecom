import axios from "./axios"
import { useQuery } from "@tanstack/react-query"
const Endpoint = "category"

export type Category = {
    id: number;
    name: string;
    description: string | null;
    parentId: number | null;
    parent: {
        id: number;
        name: string;
        description: string | null;
        parentId: number | null;
    } | null;
    children?: Category[];
};


export function useGetCategory() {
    const getCategory = async () => {
        const response = await axios.get<Category[]>(Endpoint)
        return response.data
    }
    return useQuery({
        queryKey: [Endpoint],
        queryFn: getCategory,
        staleTime: Infinity,
    })
}

