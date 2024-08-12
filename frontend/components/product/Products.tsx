"use client";
import { useGetProducts } from '@/api/products';
import { isEmptyArray } from '@/lib/utils';
import { ProductAPIType } from '@/lib/validators/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Products = (): JSX.Element => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useGetProducts();

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasNextPage, fetchNextPage]);

    if (isLoading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error loading products: {error.message}</div>;
    }

    if (!data || isEmptyArray(data.pages)) {
        return <div>No products available</div>;
    }

    return (
        <>
            {data.pages.map((page) =>
                page.map((product: ProductAPIType) => (
                    <Product
                        imageUrl="https://picsum.photos/id/237/200/300"
                        key={product.id}
                        name={product.name}
                        id={product.id}
                        brand={product.brand}
                        price={product.price}
                    />
                ))
            )}
            {/* this ref div calls fetchNextPage */}
            <div ref={observerRef} style={{ height: 20 }}></div>

            {isFetchingNextPage && <div>Loading more...</div>}
        </>
    );
};

interface ProductProps {
    id?: string;
    imageUrl: string;
    name: string;
    brand?: { name?: string }; 
    price?: number;
}

const Product = ({ id, imageUrl, name, brand, price }: ProductProps): JSX.Element => {
    return (
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
    );
};

export default Products;
