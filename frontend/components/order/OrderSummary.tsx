import { FC } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

const OrderSummary: FC<OrderSummaryProps> = ({ subtotal, shippingFee, discount, total }) => {
  return (
    <Card className='p-8'>
      <h1>Order Summary</h1>
      <Button>Proceed to checkout</Button>
    </Card>
  );
};

export default OrderSummary;
