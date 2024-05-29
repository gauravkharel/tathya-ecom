"use client"
import Link from 'next/link'
import Image from 'next/image'
import useAxiosPrivate from '@/hooks/use-axios-interceptor'
import { useEffect, useState } from 'react'
import { ProductType } from '@/lib/types'
import axios from 'axios'
import { useGetProducts } from '@/hooks/use-get-products'
const Products = (): JSX.Element => {
    const [products, setProducts] = useState([])
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get('/products', {
                    signal: controller.signal
                })
                {
                    isMounted &&
                    setProducts(response.data)
                    console.log(products)
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    console.log('mujiiiiii', err);
                }
            }
        }

        getProducts()
        return () => {
            controller.abort();
        }
    }, [])


    // const { data: products, error, isLoading } = useGetProducts();

    // console.log(products)

    return (
        <>
            {/* {
                isLoading && <div>Loading</div>
            }
            {
                error && <div>Erorr loading products : {error.message}</div>
            }
            {!isLoading && !error && products && <div>Hello to the loaded</div>} */}
            {products.map(product =>
                <Product
                    imageUrl="https://utfs.io/f/ced4bad0-115a-407a-beb1-73334facd263-yguxs3.jpeg"
                    key={product.id}
                    name={product.name}
                    id={product.id}
                    brand={product.brand}
                    price={product.price}
                />
            )}
        </>

    )
}

// @ts-ignore
const Product = ({ id,imageUrl, name,  brand, price }) => {
    const {name: brandName} = brand
    return (
        <>
            <Link href={`/products/${id}`} key={id}>
                <div key={id}>
                    <div>
                        <Image src={imageUrl} alt={brand} width={250} height={250} />
                    </div>
                    {name}
                    <div>
                        <div className='text-lg font-medium text-gray-600'>
                            {brandName}
                        </div>
                        <div className='text-lg font-bold text-gray-500'>{price}</div>
                        {/* need to add reviews too,in the schema */}
                    </div>
                </div>
            </Link>
        </>
    )
}


{/* <div className='flex flex-row gap-3'>
<span className='font-medium text-md text-gray-400'>Available in: </span>
<div
    className={"w-6 h-6 rounded-full bg-[#2733d8]"}
    title={colors}
/>
<div
    className={"w-6 h-6 rounded-full bg-[pink]"}
    title={colors}
/>
</div> */}

export default Products