"use client"
import { useGetProducts } from '@/api/products'
import { isEmptyArray } from '@/lib/utils'
import { ProductAPIType } from '@/lib/validators/product'
import Image from 'next/image'
import Link from 'next/link'

const Products = (): JSX.Element => {
    const { data, isLoading, error } = useGetProducts()

    if (isLoading) {
        return <div>Loading</div>
    }

    if (error) {
        return <div>Error loading products: {error.message}</div>
    }

    if (!data || isEmptyArray(data)) {
        return <div>No products available</div>
    }

    return (
        <>
            {data.map((product: ProductAPIType) => (
                <Product
                    imageUrl="https://picsum.photos/id/237/200/300"
                    key={product.id}
                    name={product.name}
                    id={product.id}
                    brand={product.brand}
                    price={product.price}
                />
            ))}

            
        </>
    )
}

interface ProductProps {
    id?: string;
    imageUrl: string;
    name: string;
    brand?: { name?: string }; // Assuming brand is an object with a name property
    price?: number;
}

const Product = ({ id, imageUrl, name, brand, price }: ProductProps): JSX.Element => {
    return (
        <>
        <Link href={`/products/${id}`} key={id}>
            <div>
                <div>
                    <Image src={imageUrl} alt={name} width={250} height={250} />
                </div>
                {name}
                <div>
                    <div className='text-lg font-medium text-gray-600'>
                        {brand?.name}
                    </div>
                    <div className='text-lg font-bold text-gray-500'>${price}</div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default Products
