-- CreateTable
CREATE TABLE `GiftCard` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cardCuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cardValue` SMALLINT NOT NULL DEFAULT 0,
    `redeemed` BOOLEAN NOT NULL DEFAULT false,
    `redemptionId` BIGINT,

    UNIQUE INDEX `GiftCard.cardCuid_unique`(`cardCuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Redemption` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalValue` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` TINYINT NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `password` CHAR(44) NOT NULL,
    `salt` CHAR(12) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GiftCard` ADD FOREIGN KEY (`redemptionId`) REFERENCES `Redemption`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
