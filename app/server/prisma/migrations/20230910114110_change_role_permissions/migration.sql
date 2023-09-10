/*
  Warnings:

  - You are about to drop the column `rulePermission` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "rulePermission",
ADD COLUMN     "permissions" INTEGER[];
