"use client";
import { GetProductsQueryParams, useGetProducts } from '@/api/products';
import { isEmptyArray } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FilterNav from './FilterNav';
import { useProductFilter } from '@/providers/FilterProvider';
import { Slider } from '../ui/Slider';
import { motion } from 'framer-motion';
import { ProductResponse } from '@/lib/types';

const Products = (): JSX.Element => {
    const { filters } = useProductFilter();
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
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
        return <div>Loading...</div>;
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
                    <div>
                        <div className='font-semibold text-lg mb-4'>Browse by category</div>
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
            </div>

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
                                category={product.category} 
                            />
                        ))
                    )}
                    <div ref={observerRef} style={{ height: 20 }}></div>
                    {isFetchingNextPage && (
                        <div className="text-center mt-4">
                            <motion.div
                                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-cyan-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    )}
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
            <motion.div
                className="transition duration-300 ease-in-out hover:bg-gray-100"
            >
                <div className="relative w-full h-64">
                    <Image
                        src={imageUrl}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                    />
                </div>
                <div className="mt-4 px-4">
                    <h3 className="text-xl font-light text-gray-700 hover:underline transition-colors duration-200">
                        {name}
                    </h3>
                    <div className="text-sm italic text-gray-500 mt-1">{brand?.name}</div>
                    <div className="text-lg font-bold text-gray-900 mt-2">${price}</div>
                    <div className="text-sm text-gray-400 mt-1">
                        {category?.name}
                        {category?.parent ? `, ${category.parent.name}` : ''}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};


export default Products;
