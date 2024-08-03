"use client"

import React, { useState } from 'react';
import { CartType } from '@/lib/type/cart.type';
import { useCart } from '@/providers/CartProvider';

const AddProductButton = ({clothingId}:any) => {
  const { addProductToCart } = useCart();
  const [product, setProduct] = useState<CartType>({
    clothingId: 0,
    userId: 'c0906bf7-96d8-40f0-8674-08dab1bc8092',
    quantity: 1,
  });

  const handleAddProduct = () => {
    setProduct((prevProduct) => ({ ...prevProduct, clothingId:clothingId }));
    console.log(product)
    addProductToCart({ ...product, clothingId:clothingId });
  };
  return (
    <div>
      <button onClick={handleAddProduct}>Add to Cart</button>
    </div>
  );
}

export default AddProductButton;
