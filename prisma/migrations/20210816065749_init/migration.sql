/*
  Warnings:

  - You are about to drop the column `cardCuid` on the `giftcard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardCode]` on the table `GiftCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardCode` to the `GiftCard` table without a default value. This is not possible if the table is not empty.
  - The required column `cardPwd` was added to the `GiftCard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `phoneNumber` to the `Redemption` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `GiftCard.cardCuid_unique` ON `giftcard`;

-- AlterTable
ALTER TABLE `giftcard` DROP COLUMN `cardCuid`,
    ADD COLUMN `cardCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `cardPwd` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `redemption` ADD COLUMN `phoneNumber` CHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `GiftCard.cardCode_unique` ON `GiftCard`(`cardCode`);
