"use client";

import { FC, useState } from 'react';
import CartItem from './CartItem';
import { useCart } from '@/providers/CartProvider';
import { Delete } from 'lucide-react';
import { isEmptyArray } from '@/lib/utils';
import { useGetCart } from '@/api/cart';
import EmptyCart from './EmptyCart';
import Title from '../ui/Title';
import OrderSummary from '../order/OrderSummary';

const CartLayout: FC = () => {
  const { cart, deleteCartItems } = useCart();
  const { refetch } = useGetCart();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleCheck = (id: string) => {
    const selectedItem = cart.find(item => item.id === id);
    if (selectedItem) {
      setSelectedItems((prev) => [...prev, selectedItem]);
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleUncheck = (id: string) => {
    setCheckedItems((prev) => prev.filter((item) => item !== id));
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    if (checkedItems.length > 0) {
      deleteCartItems(checkedItems);
      setCheckedItems([]);
      setSelectedItems([]);
      refetch();
    }
  };

  return (
    <>
      <div className='flex flex-row justify-between w-2/3'>
        <Title>Your cart</Title>
        {checkedItems.length > 0 && (
          <Delete onClick={handleDeleteAll} />
        )}
      </div>
      <div className='flex flex-row gap-4'>
        <div className='w-2/3'>
          {isEmptyArray(cart) ? (
            <EmptyCart />
          ) : (
            cart.map((cartItem) => (
              <div key={cartItem.id}>
                <CartItem
                  // key={cartItem.id}
                  //@ts-ignore
                  name={cartItem.clothing?.name}
                  id={cartItem.id!}
                  price={cartItem.clothing?.price}
                  onCheck={handleCheck}
                  onUncheck={handleUncheck}
                />
                {cartItem.quantity}
              </div>
            ))
          )}
        </div>

        <div className='w-1/3'>
                   </div>
      </div>
    </>
  );
};

export default CartLayout;
