/*
  Warnings:

  - You are about to drop the column `updateAt` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `products` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
