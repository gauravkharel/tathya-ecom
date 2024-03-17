import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const useRegister = async() => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/register`;
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(url, data);
    },
  });
};

export default useRegister;
