"use client"

import Image from "next/image";
import { Card } from "../ui/Card";
import { FC, useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { useGetCart } from "@/api/cart";

interface CartItemProps {
  name: string | 'Waka';
  id: string;
  price: number | undefined;
  onCheck: (id: string) => void;
  onUncheck: (id: string) => void;

}
  
const CartItem: FC<CartItemProps> = ({ name, id, price, onCheck, onUncheck }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onCheck(id);
    } else {
      onUncheck(id);
    }
  };

  return (
    <Card className="text-gray-400 px-4 my-4 flex flex-row gap-3 place-content-between">
      <div className="flex flex-row gap-4">
        <div>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </div>
        <Image src="https://picsum.photos/id/237/200/300" alt={name} width={100} height={100} />
        <span>
          <h2 className="text-xl font-medium text-gray-600">{name}</h2>
          {/* <p className="text-sm ">Size: {size ? size : <span>Not specified</span>}</p> */}
        </span>
      </div>
      <div className="flex flex-row gap-8 mt-8">
        <span className="text-lg text-gray-600">${price}</span>
      </div>
    </Card>
  );
};

export default CartItem;
