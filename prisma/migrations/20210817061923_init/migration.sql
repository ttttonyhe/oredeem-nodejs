/*
  Warnings:

  - You are about to drop the column `manualRedeemed` on the `giftcard` table. All the data in the column will be lost.
  - You are about to drop the column `manualRedeemed` on the `redemption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `giftcard` DROP COLUMN `manualRedeemed`;

-- AlterTable
ALTER TABLE `redemption` DROP COLUMN `manualRedeemed`,
    ADD COLUMN `manuallyRedeemed` BOOLEAN NOT NULL DEFAULT false;
