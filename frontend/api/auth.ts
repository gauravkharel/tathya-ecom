import axios from 'axios';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, UserRequest } from '@/lib/validators/user';
import useAuth from '@/hooks/use-auth';


interface LoginResponse {
    accessToken: string;
    email: string;
}

export function useLogin(): UseMutationResult<LoginResponse, Error, LoginRequest> {
    const queryClient = useQueryClient();
    const { setAuth } = useAuth()

    const loginRequest = async (data: LoginRequest) => {
        const { email, password } = data;

        const response = await axios.post('/login', 
            { email, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        return response.data;
    };

    return useMutation({
        mutationFn: loginRequest,
        onSettled: async (data, error) => {
            if (error) {
                console.log(error);
            } else {

                // await queryClient.invalidateQueries({ queryKey: ['products'] })
                if (data?.accessToken) {
                    setAuth({email: data.email, accessToken: data.accessToken}); 
                }
            }
        }
    });
}

export function useRegister() {
    const queryClient = useQueryClient();
    const registerRequest = async (data: UserRequest) => {
        const { firstname, lastname, email, password } = data

        const response = await axios.post('/register', 
        JSON.stringify({ fname: firstname, lname: lastname, email: email, password: password }),
        { headers: { 'Content-Type': 'application/json' } }
        )

        return response.data;
    };

    return useMutation({
        mutationFn: registerRequest,
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            }
            // } else {
            //     await queryClient.invalidateQueries({ queryKey: ['products'] })
            // }
        }
    });
}
