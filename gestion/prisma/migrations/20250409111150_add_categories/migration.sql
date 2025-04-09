/*
  Warnings:

  - Added the required column `categoryId` to the `Announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Announcements` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Announcements` ADD CONSTRAINT `Announcements_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;
