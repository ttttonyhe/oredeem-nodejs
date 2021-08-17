-- AlterTable
ALTER TABLE `giftcard` ADD COLUMN `manualRedeemed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `redemption` ADD COLUMN `manualRedeemed` BOOLEAN NOT NULL DEFAULT false;
