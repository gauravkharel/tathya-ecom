/*
  Warnings:

  - You are about to drop the column `agegroup` on the `clothing` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `clothing` table. All the data in the column will be lost.
  - You are about to drop the column `colors` on the `clothing` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `clothing` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `clothing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clothing" DROP COLUMN "agegroup",
DROP COLUMN "brand",
DROP COLUMN "colors",
DROP COLUMN "sizes",
ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "genderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "refreshtoken" ALTER COLUMN "expiresAt" SET DEFAULT now();

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_name_key" ON "Gender"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "clothing" ADD CONSTRAINT "clothing_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clothing" ADD CONSTRAINT "clothing_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clothing" ADD CONSTRAINT "clothing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
