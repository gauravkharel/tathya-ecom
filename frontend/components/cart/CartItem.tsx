"use client"

import { LucideArrowLeft, LucideArrowRight, LucideX } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface CartItemProps {
    name: string,
    id: number,
    color: string,
    size: number,
    count: number,
    price: number 
}

const CartItem = ({  name, id, color, size, count, price }: CartItemProps) => {
  
    return (
     <>
        <Card>
            <h2>{name}</h2>
            <p><span>{count}</span></p>
        </Card>
     </>
    )
};


export default CartItem