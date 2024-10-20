"use client";

import React from "react";

interface OrderSummaryProps {
  selectedItems: any[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedItems }) => {
  const totalAmount = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-2">
        {selectedItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.clothing?.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-4 text-right font-bold text-lg">
        Total: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderSummary;
