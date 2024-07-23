"use client"

import { LucideArrowLeft, LucideArrowRight, LucideX, MinusSquare, PlusSquare } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import Image from "next/image";
import { Input } from "../ui/Input";

interface CartItemProps {
    name: string,
    id: number,
    color: string,
    size: number,
    count: number,
    price: number
}

const CartItem = ({ name, id, color, size, count, price }: CartItemProps) => {
    return (
        <>
            <Card className="text-gray-400 px-4 my-4 flex flex-row gap-3 *:p-3 place-content-between">
                <div className="flex flex-row gap-4 ">
                    <div className="">
                        <Input type="checkbox" />
                    </div>
                    <Image src="https://picsum.photos/id/237/200/300" alt={name} width={100} height={100} />
                    <span>
                        <h2 className="text-xl font-medium text-gray-600">{name}</h2>
                        <p className="text-sm ">Size: {size ? size : <p>Not specified</p>}</p>
                        <p className="text-sm">Color: {color ? color : <p>Color not specified</p>}</p>
                    </span>
                </div>
                <div className="flex flex-row gap-8 mt-8">
                    <span className="text-lg text-gray-600">
                        ${price}
                    </span>
                    <div className="flex flex-row gap-2 text-gray-500 px-10">
                        <PlusSquare />
                        {count}
                        <MinusSquare />
                    </div>
                </div>
            </Card>
        </>
    )
};


export default CartItem