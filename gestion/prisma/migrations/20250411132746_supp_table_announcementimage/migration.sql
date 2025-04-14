/*
  Warnings:

  - You are about to drop the `AnnouncementImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnnouncementImage` DROP FOREIGN KEY `AnnouncementImage_announcementId_fkey`;

-- AlterTable
ALTER TABLE `Announcements` ADD COLUMN `image` LONGTEXT NULL;

-- DropTable
DROP TABLE `AnnouncementImage`;
