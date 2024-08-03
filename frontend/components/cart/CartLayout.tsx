"use client"
import { FC, useState } from 'react';
import { Card } from '../ui/Card';
import CartItem from './CartItem';
import { CartType } from '@/lib/type/cart.type';
import { useCart } from '@/providers/CartProvider';
import { Delete } from 'lucide-react';
import { Button } from '../ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteCartItems } from '@/api/cart';

interface CartLayoutProps {
  id: String;
}

const CartLayout: FC<CartLayoutProps> = ({ }) => {
  const { cart } = useCart();
  const [checkedItems, setCheckedItems] = useState<string[]>([]); 
  const queryClient = useQueryClient();

  const { mutate: deleteCartItems } = useDeleteCartItems({
    onSuccess: () => {
      queryClient.invalidateQueries('carts');
      setCheckedItems([]); 
    },
    onError: (error) => {
      console.error("Error deleting cart items:", error);
    }
  });

  if (!cart) return <p>Loading cart...</p>;

  const handleCheck = (id: string) => {
    setCheckedItems((prev) => [...prev, id]);
    console.log(checkedItems);
  }

  const handleUncheck = (id: string) => {
    setCheckedItems((prev) => prev.filter((item) => item !== id));
  }

  // Delete selected items
  const handleDeleteAll = () => {
    deleteCartItems({ cartIds: checkedItems });
    console.log('Deleted: ', checkedItems);
  }

  return <>
    <h1>Your cart</h1>
    {checkedItems.length > 0 && 
      <Delete onClick={handleDeleteAll} ></Delete>
    }
    <p><span></span></p>
    <div className='flex flex-row gap-4'>
      <div className='w-2/3'>
        {cart.map((cart: CartType) => (
          <CartItem
            key={cart.id}
            name={cart.clothing?.name}
            id={cart.id}
            size={cart.clothing?.price}
            price={cart?.clothing?.price}
            onCheck={handleCheck} 
            onUncheck={handleUncheck}
          />
        ))}
      </div>
      <div className='w-1/3'>
        <Card className='p-8'>
          <h1>Order Summary</h1>
          <span>Subtotal: { /* Calculate subtotal */ }</span>
          <span>Shipping fee: { /* Calculate shipping fee */ }</span>
          <span>Shipping fee discount: { /* Calculate discount */ }</span>
          <span>Total: { /* Calculate total */ }</span>
          Proceed to checkout
        </Card>
      </div>
    </div>
  </>
}

export default CartLayout;
