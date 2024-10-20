"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useGetCart, useAddProductToCart, useDeleteCartItems } from '../api/cart';
import { useToast } from '@/hooks/use-toast';
import { CartType } from '@/lib/types';

interface CartContextValue {
  cart: CartType[];
  addProductToCart: (product: CartType) => void;
  deleteCartItems: (cartIds: string[]) => void;
  updateCartQuantityLocally: (cartId: string, quantity: number) => void;
}

const defaultCartValue: CartContextValue = {
  cart: [],
  addProductToCart: () => { },
  deleteCartItems: () => { },
  updateCartQuantityLocally: () => {},
};

export const CartContext = createContext<CartContextValue>(defaultCartValue);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: cartData = [], refetch } = useGetCart();
  const { toast } = useToast();
  const [localCart, setLocalCart] = useState<CartType[]>(cartData); 
  useEffect(() => {
    // Only update localCart if the data from the backend (cart) is actually different
    if (cartData && JSON.stringify(cartData) !== JSON.stringify(localCart)) {
      setLocalCart(cartData); 
    }
  }, [cartData])

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
    const existingProduct = localCart.find(item => item.clothingId === product.clothingId);  
    if (existingProduct) {
      updateCartQuantityLocally(existingProduct.id, existingProduct.quantity + product.quantity);
    } else {
      addProductToCartMutation.mutate(product);
    }
  };

  const deleteCartItems = (cartIds: string[]) => {
    deleteCartItemsMutation.mutate({ cartIds });
  };

  const updateCartQuantityLocally = (cartId: string, quantity: number) => {
    setLocalCart((prevCart) => 
      prevCart.map((item) => 
        item.id === cartId ? { ...item, quantity } : item
      )
    );
  };

  const value = {
    cart: localCart,
    addProductToCart,
    deleteCartItems,
    updateCartQuantityLocally,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
