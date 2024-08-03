"use client";

import { LucideArrowLeft, LucideArrowRight, LucideX } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
<<<<<<< refs/remotes/origin/feat/cart

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
=======
import Image from "next/image";
import { Input } from "../ui/Input";
import { useCart } from "@/providers/CartProvider";
import { useState } from "react";

interface CartItemProps {
    name?: string,
    id: string,
    size?: number,
    price: number | undefined,
    onCheck: (id: string) => void,
    onUncheck: (id: string) => void,
    quantity: number 
}

const CartItem = ({ name, id, size, price, onCheck, onUncheck }: CartItemProps) => {
    const { quantity, setQuantity } = useCart();
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            onCheck(id);
        } else {
            onUncheck(id);
        }
    };

    return (
        <>
            <Card className="text-gray-400 px-4 my-4 flex flex-row gap-3 *:p-3 place-content-between">
                <div className="flex flex-row gap-4 ">
                    <div className="">
                        <Input 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={handleCheckboxChange} 
                        />
                    </div>
                    <Image src="https://picsum.photos/id/237/200/300" alt={name} width={100} height={100} />
                    <span>
                        <h2 className="text-xl font-medium text-gray-600">{name}</h2>
                        <p className="text-sm ">Size: {size ? size : "Not specified"}</p>
                        {/* <p className="text-sm">Color: {color ? color : <p>Color not specified</p>}</p> */}
                    </span>
                </div>
                <div className="flex flex-row gap-8 mt-8">
                    <span className="text-lg text-gray-600">
                        ${price}
                    </span>
                    <div className="flex flex-row gap-2 text-gray-500 px-10">
                        <PlusSquare onClick={() => setQuantity(prevQuantity => prevQuantity + 1)} />
                        {quantity}
                        <MinusSquare onClick={() => setQuantity(prevQuantity => prevQuantity - 1)} />
                    </div>
                </div>
            </Card>
        </>
    );
>>>>>>> local
};

export default CartItem;
