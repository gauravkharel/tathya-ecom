"use client"
import { FC } from 'react'
import { Card } from '../ui/Card'
import CartItem from './CartItem'

interface CartLayoutProps {

}

const CartLayout: FC<CartLayoutProps> = ({ }) => {
  return <>
    <h1>Your cart</h1>
    <p><span></span></p>
    {/* <Title> Cart </Title> */}
    <div className='flex flex-row gap-4'>
      <div className='w-2/3'>
        <CartItem
          name={"saoh"}
          id={24}
          color={"dahodh"}
          size={24}
          count={24}
          price={24}
        />
        <CartItem
          name={"saoh"}
          id={2}
          color={"dahodh"}
          size={24}
          count={24}
          price={24}
        />
        <CartItem
          name={"saoh"}
          id={3}
          color={"dahodh"}
          size={24}
          count={24}
          price={24}
        />
        <CartItem
          name={"saoh"}
          id={5}
          color={"dahodh"}
          size={24}
          count={24}
          price={24}
        />
        <CartItem
          name={"saoh"}
          id={6}
          color={"dahodh"}
          size={24}
          count={24}
          price={24}
        />
      </div>
      <div className='w-1/3'>
        <Card className='p-8'>
          <h1>Order Summary</h1>
          <span>Subtotal: { }</span>
          <span>Shipping fee: { }</span>
          <span>Shipping fee discount: { }</span>
          
          <span>Total: { }</span>

          Proceed to checkout
        </Card>
      </div>
    </div>


  </>
}

export default CartLayout