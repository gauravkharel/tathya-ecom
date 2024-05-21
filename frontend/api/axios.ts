import assert from 'assert' //The assert() method tests if a given expression is true or not.
import Axios, { AxiosRequestConfig } from 'axios'

assert(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "env variable not set: NEXT_PUBLIC_API_BASE_URL"
)

export default Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const axiosPrivate = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
