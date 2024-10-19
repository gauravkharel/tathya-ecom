"use client"

import { ArrowLeft, LucideTicketCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import EmblaCarousel from '../ui/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import '../../public/embla.css';
import { Button } from '../ui/Button';
import { useGetProduct } from '@/api/products';
import AddProductButton from './AddToCart';
import { motion } from 'framer-motion';

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
    <div className='container mx-auto px-4 py-6'>
      {/* Breadcrumb section */}
      <div className='mb-4'>
        <Link href={`/products`} className='flex gap-2 items-center text-gray-600 hover:text-cyan-600 transition'>
          <ArrowLeft />
          <h3 className='font-medium'>Back to All products</h3>
        </Link>
      </div>

      <div className='lg:flex gap-8'>
        {/* Image Carousel */}
        <motion.div className='lg:w-1/2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </motion.div>

        {/* Product Info */}
        <motion.section className='lg:w-1/2 space-y-6'
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title and Brand */}
          <div>
            <h2 className='text-2xl font-bold text-cyan-600'>{product?.name}</h2>
            <h3 className='text-lg font-light text-gray-600'>{product?.brand?.name}</h3>
            <p className='text-gray-500 text-sm'>★★★★★ (120 reviews)</p>
          </div>

          {/* Description */}
          <div className='text-gray-700'>
            <p>{product?.description}</p>
          </div>

          {/* Price */}
          <div className='pt-3'>
            <p className='text-xl font-semibold text-cyan-600'>${product?.price}</p>
            <p className='text-sm font-light text-gray-600'>Only 10 left in stock</p>
          </div>

          {/* Pickup Notice */}
          <div className='flex items-center space-x-2 text-cyan-400'>
            <LucideTicketCheck />
            <span>Available for pickup from the station.</span>
          </div>

          {/* Add to Cart Button */}
          <AddProductButton clothingId={id} />

          {/* Urgency message */}
          <p className='mt-2 text-sm text-red-500 font-semibold'>
            Hurry! This item is <span className='font-bold'>selling like wildfire</span>.
          </p>
        </motion.section>
      </div>

      {/* Additional Actions Section */}
      <section className='mt-8'>
        <h4 className='text-lg font-semibold text-gray-800 mb-4'>Actions</h4>
        <div className='flex space-x-4'>
          <Button variant='outline'>Add to Favorites</Button>
          <Button variant='outline'>Share Product</Button>
        </div>
      </section>

      {/* Reviews Section */}
      <section className='mt-10'>
        <h4 className='text-lg font-semibold text-gray-800 mb-4'>Customer Reviews</h4>
        <p className='text-gray-500'>★★★★★ 4.8 average rating (120 reviews)</p>
        {/* Add customer reviews list here */}
      </section>
    </div>
  );
};

export default Product;
