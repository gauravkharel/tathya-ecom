"use client";
import { GetProductsQueryParams, useGetProducts } from '@/api/products';
import { isEmptyArray } from '@/lib/utils';
import { ProductResponse } from '@/lib/type/validators/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FilterNav from './FilterNav';
import { useProductFilter } from '@/providers/FilterProvider';
import { Slider } from '../ui/Slider';

const Products = (): JSX.Element => {
    // const [categories, setCategories] = useState<string[]>([])
    // const [brands, setBrands] = useState<string[]>([])
    const { filters } = useProductFilter()
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useGetProducts({ categories: filters.categories, brands: filters.brands });
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
                        <div className='flex flex-col gap-6'>
                            <FilterNav />
                            <div className='disabled text-gray-300'>
                                <span className='pb-4'>By price</span> <br />
                                <span className='text-gray-300'>Feature for later</span>
                                <Slider className='pt-3 text-gray-100' defaultValue={[33]} max={100} step={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='col-span-5'>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4'>
                    {data.pages.map((page) =>
                        page.map((product: ProductResponse) => (
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
