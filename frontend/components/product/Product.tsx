"use client"

import { ArrowLeft, CarTaxiFrontIcon, LucideTicketCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import EmblaCarousel from '../ui/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import '../../public/embla.css';
import { Button } from '../ui/Button';
import { useGetProduct } from '@/api/products';
import { ProductResponse } from '@/lib/type/validators/product';
import AddProductButton from './AddToCart';

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

interface ProductProps {
  id: number;
}

const Product: React.FC<ProductProps> = ({ id }) => {
  const { data: product, error, isLoading } = useGetProduct(id);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product.</div>;

  return (
    <div>
      <h2>Breadcrumb section</h2>
      <br /><div>
      <Link href={`/products`} className='flex gap-2 pr-6'>
        <ArrowLeft />
        <h3 className='font-medium'>Sneakers</h3>
      </Link>
      </div>
      <div className='w-[1/2] float-start'>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <section>
        <div>
          <h2 className='text-xl font-bold text-cyan-600'>{product?.name}</h2>
          <h3 className='text-xl font-light text-gray-600 '>{product?.brand?.name}</h3>
          <p>reviews</p>
        </div>
        <div>
          <p><span className='text-md'>{product?.description}</span></p>
        </div>
        <div className='pt-3'>
          <p><span className='text-xl text-cyan-600'> ${product?.price}</span></p>
          <p><span className='text-lg font-light'>Only 10 left</span></p>
        </div>

        <div className='flex flex-col'>
          <p>
            <span className='text-cyan-400'><LucideTicketCheck className='text-cyan-400'></LucideTicketCheck> The product can be pickup from the station.</span>
          </p>
        </div>

        <AddProductButton clothingId={id} />
        <p>Hurry! this item is <span className='font-bold text-cyan-500'>selling like a wildfire.</span> </p>
      </section>
      <section>
        list of stuffs that are can be done
        add to fav
        and, so on
      </section>
      <section>
        reviews
      </section>
    </div>
  );
};

export default Product;
