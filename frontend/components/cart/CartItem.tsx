"use client";

import React, { useState } from "react";
import { useCart } from "@/providers/CartProvider";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onCheck: (id: string) => void;
  onUncheck: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, onCheck, onUncheck }) => {
  const { updateCartQuantityLocally } = useCart();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [checked, setChecked] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setCurrentQuantity(newQuantity);
      updateCartQuantityLocally(id, newQuantity);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      onCheck(id);
    } else {
      onUncheck(id);
    }
  };

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          className="w-4 h-4"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">{name}</h3>
          <span className="text-gray-500">${price}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={currentQuantity}
          min={1}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded"
        />
        <span className="text-lg font-bold">${(price * currentQuantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartItem;
