"use client"
import { FC } from 'react'
import { Card } from '../ui/Card'
import Title from '../ui/Title'
import CartItem from './CartItem'

interface CartLayoutProps {

}

const CartLayout: FC<CartLayoutProps> = ({ }) => {
  return <Card>
    <Title> Cart </Title>
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
    

    
  </Card>
}

export default CartLayout