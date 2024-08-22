"use client";
import { useGetProducts } from '@/api/products';
import { isEmptyArray } from '@/lib/utils';
import { ProductAPIType } from '@/lib/validators/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FilterNav from './FilterNav';


const Products = (): JSX.Element => {
    const [categories, setCategories] = useState<string[]>([])
    const [brands, setBrands] = useState<string[]>([])
    const [gender, setGender] = useState<string | undefined>();
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useGetProducts({ categories, brands, });

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let observerRefValue = null;
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
            if (observerRefValue) {
                observer.unobserve(observerRefValue);
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
            <div className='col-span-1'>
                <div className='sticky top-[80px]'>
                    <div className='sticky'>
                        <div>Browse by category</div>
                        <div>
                            <FilterNav />
                        </div>
                    </div>
                </div>
            </div >
            <div className='col-span-5'>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4'>
                    {data.pages.map((page) =>
                        page.map((product: ProductAPIType) => (
                            <Product
                                key={product.id}
                                imageUrl="https://picsum.photos/id/237/200/300"
                                name={product.name}
                                id={product.id}
                                brand={product.brand}
                                price={product.price}
                                //@ts-ignore
                                category={product.category} // Pass category data here
                            />
                        ))
                    )}

                    {/* this ref div calls fetchNextPage */}
                    <div ref={observerRef} style={{ height: 20 }}></div>

                    {isFetchingNextPage && <div>Loading more...</div>}
                </div>
            </div>

        </>
    );
};

interface ProductProps {
    id?: string;
    imageUrl: string;
    name: string;
    brand?: { name?: string };
    price?: number;
    category?: { 
        id: number;
        name: string;
        parentId: number | null;
        parent?: {
            name: string;
        } | null;
    };
}

const Product = ({ id, imageUrl, name, brand, price, category }: ProductProps): JSX.Element => {
    return (
        <Link href={`/products/${id}`} key={id}>
            <div>
                <div>
                    <Image src={imageUrl} alt={name} width={250} height={250} />
                </div>
                {name} <br />
                <div className='text-lg font-medium text-gray-600'>
                    {brand?.name}
                </div>
                <div className='text-lg font-bold text-gray-500'>
                    ${price}
                </div>
                <div className='text-md text-gray-400'>
                    {category?.name}, {category?.parent ? ` ${category.parent.name}` : ''}
                </div>
            </div>
        </Link>
    );
};


export default Products;
