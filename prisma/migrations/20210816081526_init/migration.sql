/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Redemption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Redemption.phoneNumber_unique` ON `Redemption`(`phoneNumber`);
