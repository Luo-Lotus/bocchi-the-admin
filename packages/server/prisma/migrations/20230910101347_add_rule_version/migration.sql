/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_parentId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Permission";
