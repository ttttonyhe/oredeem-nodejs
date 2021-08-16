/*
  Warnings:

  - You are about to drop the column `redemptionId` on the `giftcard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cuid]` on the table `GiftCard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `giftcard` DROP FOREIGN KEY `giftcard_ibfk_1`;

-- AlterTable
ALTER TABLE `giftcard` DROP COLUMN `redemptionId`,
    ADD COLUMN `redemptionCuid` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `GiftCard.cuid_unique` ON `GiftCard`(`cuid`);

-- AddForeignKey
ALTER TABLE `GiftCard` ADD FOREIGN KEY (`redemptionCuid`) REFERENCES `Redemption`(`cuid`) ON DELETE SET NULL ON UPDATE CASCADE;
