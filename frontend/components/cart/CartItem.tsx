"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import { Minus, Plus } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onCheck: (id: string) => void;
  onUncheck: (id: string) => void;
}

const CartItem = ({ id, name, price, quantity, onCheck, onUncheck }: CartItemProps) => {
  const { updateCartQuantityLocally } = useCart();
  const [checked, setChecked] = useState(false);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity > 0) {
      updateCartQuantityLocally(id, newQuantity);
    }
  }, [id, updateCartQuantityLocally]);

  const handleCheck = useCallback((e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      onCheck(id);
    } else {
      onUncheck(id);
    }
  }, [id, onCheck, onUncheck]);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500"
      />
      
      <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100">
        <img
          src="/api/placeholder/96/96"
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-lg text-gray-900">{name}</h3>
        <p className="text-gray-500">${price?.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-12 text-center font-medium">{quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="text-lg font-semibold text-gray-900">
        ${(price * quantity).toFixed(2)}
      </div>
    </motion.div>
  );
};

export default CartItem;
