import assert from 'assert' 
import Axios, { AxiosRequestConfig } from 'axios'

//assert helps to not build the app if the base url is missing
assert( 
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "env variable not set: NEXT_PUBLIC_API_BASE_URL"
)
Axios.defaults.withCredentials = true;

export default Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const controller = new AbortController();

export const axiosPrivate = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    signal: controller.signal,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
