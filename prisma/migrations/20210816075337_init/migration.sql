/*
  Warnings:

  - The required column `cuid` was added to the `GiftCard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `giftcard` ADD COLUMN `cuid` VARCHAR(191) NOT NULL;
