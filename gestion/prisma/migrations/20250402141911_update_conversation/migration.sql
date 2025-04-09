/*
  Warnings:

  - Added the required column `announcementId` to the `Conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversations` ADD COLUMN `announcementId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Conversations` ADD CONSTRAINT `Conversations_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcements`(`id_announcement`) ON DELETE RESTRICT ON UPDATE CASCADE;
