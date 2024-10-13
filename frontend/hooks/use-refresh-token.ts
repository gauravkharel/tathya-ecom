import axios from "@/lib/axios";
import useAuth from "./use-auth";
import { useToast } from "./use-toast";

const useRefreshToken = () => {
  const {toast} = useToast()
  const {auth, setAuth} = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    toast({
      title: `Welcome to Tathya Shopping Experience.`,
      description: "Have a good time :)",
      variant: "default"
    })
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
