"use client"

import Link from 'next/link'
import products from '../../mock/mock.json'
import Image from 'next/image'

const Products = (): JSX.Element => {
    return (
        <>
            {products.map(product => {
                return (
                    <Product
                        key={product.id}
                        id={product.id}
                        imageurl={product.imageurl}
                        brand={product.brand}
                        colors={product.colors}
                        price={product.price}
                        review='3.4'
                    />
                )
            })}
        </>

    )
}

// @ts-ignore
const Product = ({ id, imageurl, brand, colors, price, review }) => {
    return (
        <>
            <Link href={`/products/${id}`} key={id}>
                <div key={id}>
                    <div>
                        <Image src={imageurl} alt={brand} width={250} height={250} />
                    </div>
                    <div>
                        <div className='text-lg font-medium text-gray-600'>{brand}</div>
                        <div className='flex flex-row gap-3'>
                            <span className='font-medium text-md text-gray-400'>Available in: </span>
                            <div
                                className={"w-6 h-6 rounded-full bg-[#2733d8]"}
                                title={colors}
                            />
                            <div
                                className={"w-6 h-6 rounded-full bg-[pink]"}
                                title={colors}
                            />
                        </div>
                        <div className='text-lg font-bold text-gray-500'>{price}</div>
                        {/* need to add reviews too,in the schema */}
                        <div> {review}</div>
                    </div>
                </div>
            </Link>
        </>
    )
}


export default Products