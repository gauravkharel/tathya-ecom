import Image from "next/image";
import Link from "next/link";
import EmptyImage from "../../public/empty_cart.svg";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-[300px] mb-8">
        <Image
          priority
          src={EmptyImage}
          height={500}
          width={500}
          alt="Empty Cart Illustration"
          className="w-full h-auto"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
        Your Cart is Empty
      </h2>
      
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Looks like you haven&apos;t added anything to your cart yet. 
        Discover our amazing collection and find something you&apos;ll love!
      </p>

      <Link 
        href="/products"
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
      >
        Start Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCart