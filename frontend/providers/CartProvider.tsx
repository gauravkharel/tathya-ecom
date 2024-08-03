"use client";

import { createContext, useContext } from 'react';
import { useGetCart, useAddProductToCart } from '../api/cart';
import { CartType } from '@/lib/type/cart.type';
import { useToast } from '@/hooks/use-toast';

interface CartContextValue {
  cart: CartType[] | undefined;
  addProductToCart: (product: CartType) => void;
}

const defaultCartValue: CartContextValue = {
  cart: [],
  addProductToCart: () => {},
};

export const CartContext = createContext<CartContextValue>(defaultCartValue);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: cart, refetch } = useGetCart();
  const {toast} = useToast()
  const addProductToCartMutation = useAddProductToCart({
    onSuccess: () => {
      toast({
        title: `Successfully, added product to cart`,
        variant: 'default'
      })
      refetch();
    },
    onError: (error)=>{
      console.log(error)
      toast(
        {
          title: `Error ${error}`,
          description: `${error.response.data.message}`,
          variant: 'destructive'
        }
      )
    }
  });

  const addProductToCart = (product: CartType) => {
    addProductToCartMutation.mutate(product);
  };

  const value = {
    cart,
    addProductToCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
