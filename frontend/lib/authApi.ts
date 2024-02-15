import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const signUpUserFn = async (user: any) => {
    const response = await authApi.post('/register', user);
    return response.data;
  };