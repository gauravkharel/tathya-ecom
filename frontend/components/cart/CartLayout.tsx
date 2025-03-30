"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import OrderSummary from "../order/OrderSummary";
import { CartType } from "@/lib/types";
import { useGetCart } from "@/api/cart";

const CartLayout = () => {
  const {refetch} = useGetCart()
  const { cart, deleteCartItems } = useCart();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<CartType[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(cart.length === 0);

  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart, isCartEmpty]);

  useEffect(() => {
    const updatedSelectedItems = cart
      .filter(item => checkedItems.includes(item.id!))
      .map(item => ({
        ...item,
        price: item.clothing?.price || 0
      }));
    setSelectedItems(updatedSelectedItems);
  }, [cart, checkedItems]);

  const handleCheck = useCallback((id: string) => {
    setCheckedItems(prev => [...prev, id]);
  }, []);

  const handleUncheck = useCallback((id: string) => {
    setCheckedItems(prev => prev.filter(item => item !== id));
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (checkedItems.length > 0) {
      deleteCartItems(checkedItems);
      setCheckedItems([]);
    }

  }, [checkedItems, deleteCartItems]);

  if (isCartEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto p-4 lg:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart ({cart.length})</h1>
        {checkedItems.length > 0 && (
          <motion.button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-4 h-4" />
            Remove Selected
          </motion.button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                id={item.id!}
                name={item.clothing?.name}
                price={item.clothing?.price}
                quantity={item.quantity}
                onCheck={handleCheck}
                onUncheck={handleUncheck}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-1/3 sticky top-4">
          <AnimatePresence>
            {selectedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <OrderSummary selectedItems={selectedItems} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;