/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stock` to the `clothing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'ESEWA', 'BANK_TRANSFER');

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_clothingId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cart_id_seq";

-- AlterTable
ALTER TABLE "clothing" ADD COLUMN     "stock" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "refreshtoken" ALTER COLUMN "expiresAt" SET DEFAULT now();

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "order";

-- CreateTable
CREATE TABLE "orderitem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clothingId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shippingAddress" TEXT NOT NULL,
    "billingAddress" TEXT,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "taxAmount" DOUBLE PRECISION NOT NULL,
    "shippingCost" DOUBLE PRECISION NOT NULL,
    "discountAmount" DOUBLE PRECISION,
    "trackingNumber" TEXT,
    "estimatedDeliveryDate" TIMESTAMP(3),
    "comments" TEXT,

    CONSTRAINT "orderitem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderitem" ADD CONSTRAINT "orderitem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitem" ADD CONSTRAINT "orderitem_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "clothing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
