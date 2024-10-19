/*
  Warnings:

  - The `imageUrl` column on the `clothing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clothing" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];

-- AlterTable
ALTER TABLE "refreshtoken" ALTER COLUMN "expiresAt" SET DEFAULT now();
