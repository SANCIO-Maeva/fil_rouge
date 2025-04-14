/*
  Warnings:

  - You are about to drop the column `image` on the `Announcements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Announcements` DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `AnnouncementImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `announcementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnnouncementImage` ADD CONSTRAINT `AnnouncementImage_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcements`(`id_announcement`) ON DELETE RESTRICT ON UPDATE CASCADE;
