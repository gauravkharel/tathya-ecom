"use client"

import React, { useState } from 'react';
import { CartType } from '@/lib/type/cart.type';
import { useCart } from '@/providers/CartProvider';

const AddProductButton = ({clothingId}:any) => {
  const { addProductToCart } = useCart();
  const [product, setProduct] = useState<CartType>({
    clothingId: clothingId,
    quantity: 1
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
