import useAxiosPrivate from "@/hooks/use-axios-interceptor";
import axios from "axios";
const Endpoint = "/products";

export async function FetchAllProducts() {
  const axiosPrivate = useAxiosPrivate();
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
