"use client";

import { FC, useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import CartItem from './CartItem';
import { useCart } from '@/providers/CartProvider';
import { Delete } from 'lucide-react';
import { Button } from '../ui/Button';
import { isEmptyArray } from '@/lib/utils';
import { useDeleteCartItems, useGetCart } from '@/api/cart';
import EmptyCart from './EmptyCart';
import { useToast } from '@/hooks/use-toast';
import Title from '../ui/Title';

const CartLayout: FC = () => {
  const { cart, deleteCartItems  } = useCart();
  const { refetch, } = useGetCart()
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const handleCheck = (id: string) => {
    setCheckedItems((prev) => [...prev, id]);
  };

  const handleUncheck = (id: string) => {
    setCheckedItems((prev) => prev.filter((item) => item !== id));
  };

  const handleDeleteAll =  () => {
    if (checkedItems.length > 0) {
      deleteCartItems(checkedItems);
      setCheckedItems([]);
      refetch()
    }
  };


  return (
    <>
      <Title>Your cart</Title>
      {checkedItems.length > 0 && (
          <Delete onClick={handleDeleteAll} />
      )}
      <div className='flex flex-row gap-4'>
        <div className='w-2/3'>
          {isEmptyArray(cart) ? (
            <EmptyCart />
          ) : (
            cart.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                //@ts-ignore
                name={cartItem.clothing?.name}
                id={cartItem.id!}
                price={cartItem.clothing?.price}
                onCheck={handleCheck}
                onUncheck={handleUncheck}
              />
            ))
          )}
        </div>

        <div className='w-1/3'>
          {isEmptyArray(cart) ? (<></>) :
            (
              <Card className='p-8'>
                <h1>Order Summary</h1>
                <span>Subtotal: {/* Calculate subtotal */}</span>
                <span>Shipping fee: {/* Calculate shipping fee */}</span>
                <span>Shipping fee discount: {/* Calculate discount */}</span>
                <span>Total: {/* Calculate total */}</span>
                <Button>Proceed to checkout</Button>
              </Card>
            )
          }
        </div>
      </div>
    </>
  );
};

export default CartLayout;
