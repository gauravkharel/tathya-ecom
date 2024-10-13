"use client"

import React, { useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { Button } from '../ui/Button';
import { CartType } from '@/lib/types';

const AddProductButton = ({clothingId}:any) => {
  const { addProductToCart } = useCart();
  const [product, setProduct] = useState<CartType>({
    clothingId: clothingId,
    quantity: 1
  });

  const handleAddProduct = () => {
    setProduct((prevProduct) => ({ ...prevProduct, clothingId:clothingId }));
    addProductToCart({ ...product, clothingId:clothingId });
  };
  return (
    <div>
      <Button variant={'outline'} className='px-10' onClick={handleAddProduct}>Add to Cart</Button>
    </div>
  );
}

export default AddProductButton;
