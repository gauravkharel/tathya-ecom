"use client";

import { FC, useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useCart } from "@/providers/CartProvider";
import { Delete } from "lucide-react";
import { isEmptyArray } from "@/lib/utils";
import { useGetCart } from "@/api/cart";
import EmptyCart from "./EmptyCart";
import Title from "../ui/Title";
import OrderSummary from "../order/OrderSummary";
import { motion } from "framer-motion";

const CartLayout: FC = () => {
  const { cart, deleteCartItems } = useCart();
  const { refetch } = useGetCart();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [updatedCart, setUpdatedCart] = useState<any[]>([]);

  useEffect(() => {
    // Filter cart items that are checked and reflect their updated quantities
    const selectedProducts = cart.filter(item => checkedItems.includes(item.id));
    setUpdatedCart(selectedProducts);
  }, [checkedItems, cart]);

  useEffect(() => {
    console.log("Cart data on refetch:", cart);
  }, [cart]);


  const handleCheck = (id: string) => {
    const selectedItem = cart.find(item => item.id === id);
    if (selectedItem) {
      setSelectedItems((prev) => [...prev, selectedItem]);
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleUncheck = (id: string) => {
    setCheckedItems((prev) => prev.filter((item) => item !== id));
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    if (checkedItems.length > 0) {
      deleteCartItems(checkedItems);
      setCheckedItems([]);
      setSelectedItems([]);
      refetch();
    }
  };

  return (
    <div className="container mx-auto p-4 lg:px-0">
      <div className="flex justify-between items-center mb-6">
        <Title>Your Cart</Title>
        {checkedItems.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="flex items-center bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
          >
            <Delete className="mr-2" /> Remove Selected
          </button>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          {isEmptyArray(cart) ? (
            <EmptyCart />
          ) : (
            <div className="space-y-6">
              {cart.map((cartItem) => (
                <motion.div
                  key={cartItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                >
                  <CartItem
                    key={cartItem.id}
                    name={cartItem.clothing.name}
                    id={cartItem.id!}
                    price={cartItem.clothing.price}
                    onCheck={handleCheck}
                    onUncheck={handleUncheck}
                    quantity={cartItem.quantity}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-lg">
          {selectedItems.length > 0 && <OrderSummary selectedItems={selectedItems} />}
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
