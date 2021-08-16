/*
  Warnings:

  - A unique constraint covering the columns `[cuid]` on the table `Redemption` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `Redemption` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `redemption` ADD COLUMN `cuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Redemption.cuid_unique` ON `Redemption`(`cuid`);
