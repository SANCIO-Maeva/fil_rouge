/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Skills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Skills` DROP FOREIGN KEY `Skills_userId_fkey`;

-- DropIndex
DROP INDEX `Skills_userId_fkey` ON `Skills`;

-- AlterTable
ALTER TABLE `Skills` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- CreateTable
CREATE TABLE `UserSkills` (
    `userId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Skills_name_key` ON `Skills`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_mail_key` ON `Users`(`mail`);

-- AddForeignKey
ALTER TABLE `UserSkills` ADD CONSTRAINT `UserSkills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSkills` ADD CONSTRAINT `UserSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id_skill`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_id_user_sender_fkey` FOREIGN KEY (`id_user_sender`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_id_user_receiver_fkey` FOREIGN KEY (`id_user_receiver`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
