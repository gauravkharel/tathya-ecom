import axios from './axios'
import { UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, UserRequest } from '@/lib/validators/user';
import useAuth from '@/hooks/use-auth';

interface LoginResponse {
    accessToken: string;
    email: string;
}

export function useLogin(options?: {
    onSuccess?: (data: LoginResponse) => void;
    onError?: (error: any) => void;
}): UseMutationResult<LoginResponse, Error, LoginRequest> {
    const { setAuth } = useAuth();
    const loginRequest = async (data: LoginRequest) => {
        const { email, password } = data;
        const response = await axios.post('login',
            {
                email, password
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return response.data
    };

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            setAuth({ email: data.email, accessToken: data.accessToken });
            options?.onSuccess?.(data);

        },
        onError: (error) => {
            console.error(error);
            options?.onError?.(error);
        },
        onSettled: async (data, error) => {
            if (error) {
                console.log(error);
            } else {
                // await queryClient.invalidateQueries({ queryKey: ['products'] });
                options?.onSuccess?.(data);
            }
        }
    });
}


export function useRegister(options?: {
    onSuccess?: (data: UserRequest) => void;
    onError?: (error: any) => void;
}): UseMutationResult<UserRequest, Error, UserRequest> {
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
        onSuccess: (data) => {
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            console.error(error);
            options?.onError?.(error);
        },
        onSettled: async (data, error) => {
            if (error) {
                console.log(error);
            } else {
                // await queryClient.invalidateQueries({ queryKey: ['products'] });
                options?.onSuccess?.(data);
            }
        }
    });
}


export function useLogout() {
    const logout = async () => {
      const response = await axios.get('/logout');
      return response.data;
    };
  
    return useMutation({
        mutationFn: logout
    });
  }
