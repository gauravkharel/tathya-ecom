"use client"
import { FC, ReactNode } from 'react'
import Product from './Product'
import products from '../mock/mock.json'


const Products = (): JSX.Element => {
    return (
        <>
            {products.map(product => {
                return (
                    <ul key={product.id}>
                        <Product
                            id={product.id}
                            imageurl={product.imageurl}
                            brand={product.brand}
                            price={product.price}
                            colors={product.colors}
                        />
                    </ul>
                )
            })}
        </>

    )
}

export default Products