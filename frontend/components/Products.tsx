"use client"

import Link from 'next/link'
import products from '../mock/mock.json'
import Image from 'next/image'

const Products = (): JSX.Element => {
    return (
        <>
            {products.map(product => {
                return (
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <div key={product.id}>
                            <div>
                                <Image src={product.imageurl} alt={product.brand} width={250} height={250} />
                            </div>
                            <div>
                                <div className='text-lg'>{product.brand}</div>
                                <div className='flex flex-row gap-3'>
                                    <span>Available in: </span>
                                    <div
                                        className={"w-6 h-6 rounded-full bg-[#2733d8]"}
                                        title={product.colors}
                                    />
                                    <div
                                        className={"w-6 h-6 rounded-full bg-[pink]"}
                                        title={product.colors}
                                    />
                                </div>
                                <div>{product.price}</div>
                                {/* need to add reviews too,in the schema */}
                                <div>reviews - to be done</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </>

    )
}

export default Products