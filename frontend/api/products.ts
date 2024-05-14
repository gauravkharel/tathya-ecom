// writing the query for all the product query here
import {axios} from './axios'

const Endpoint = "/product"

export async function getProducts(){
    const {data} = await axios.get(Endpoint, {
        params: {...},

    })

    return data
}

export async function updateProduct(productId: Number){
    const {data} = await axios.patch(`${Endpoint}/${productId}`, {
        status: "resolved"
    })
    return data
}