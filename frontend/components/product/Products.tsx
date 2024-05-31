"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useGetProducts } from '@/api/products'
const Products = (): JSX.Element => {
    const { data, isLoading, error } = useGetProducts()
    return (
        <>
            {
                isLoading && <div>Loading</div>
            }
            {
                error && <div>Erorr loading products : {error.message}</div>
            }
            {
                data && data.map(product =>
                    <Product
                        imageUrl="https://utfs.io/f/ced4bad0-115a-407a-beb1-73334facd263-yguxs3.jpeg"
                        key={product.name}
                        name={product.name}
                        id={product.name}
                        brand={product.brand}
                        price={product.price}
                    />
                )
            }
        </>

    )
}

// @ts-ignore
const Product = ({ id, imageUrl, name, brand, price }) => {
    const { name: brandName } = brand
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