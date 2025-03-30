"use client";

import React, { useMemo } from "react";

interface OrderSummaryProps {
  selectedItems: any[];
}

const OrderSummary = ({ selectedItems }: OrderSummaryProps) => {
  const subtotal = useMemo(() => 
    selectedItems.reduce((acc, item) => 
      acc + (item.clothing?.price || 0) * item.quantity, 0
    ), [selectedItems]
  );

  const shipping = 0; // Free shipping for now
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.clothing?.name} x {item.quantity}
            </span>
            <span className="font-medium">
              ${((item.clothing?.price || 0) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">${total.toFixed(2)}</span>
      </div>

      <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
