"use client";

import { createContext, useContext } from 'react';
import { useGetCart, useAddProductToCart, useDeleteCartItems } from '../api/cart';
import { CartType } from '@/lib/type/type/cart.type';
import { useToast } from '@/hooks/use-toast';
interface CartContextValue {
  cart: CartType[];
  addProductToCart: (product: CartType) => void;
  deleteCartItems: (cartIds: string[]) => void;
}

const defaultCartValue: CartContextValue = {
  cart: [],
  addProductToCart: () => { },
  deleteCartItems: () => { },
};

export const CartContext = createContext<CartContextValue>(defaultCartValue);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: cartData = [], refetch } = useGetCart();
  const { toast } = useToast();
  const addProductToCartMutation = useAddProductToCart({
    onSuccess: () => {
      toast({
        title: 'Successfully added product to cart',
        variant: 'funky',
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: `Error ${error}`,
        description: `${error.response?.data?.message}`,
        variant: 'destructive',
      });
    },
  });

  const deleteCartItemsMutation = useDeleteCartItems({
    onSuccess: () => {
      toast({
        title: 'Successfully deleted items from cart',
        variant: 'lessdestructive',
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: `Error ${error}`,
        description: `${error.response?.data?.message}`,
        variant: 'destructive',
      });
    },
  });

  const addProductToCart = (product: CartType) => {
    addProductToCartMutation.mutate(product);
  };

  const deleteCartItems = (cartIds: string[]) => {
    deleteCartItemsMutation.mutate({ cartIds });
  };

  const value = {
    cart: cartData,
    addProductToCart,
    deleteCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
