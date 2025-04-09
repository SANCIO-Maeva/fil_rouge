/*
  Warnings:

  - You are about to drop the column `announcementId` on the `Conversations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Conversations` DROP FOREIGN KEY `Conversations_announcementId_fkey`;

-- DropIndex
DROP INDEX `Conversations_announcementId_fkey` ON `Conversations`;

-- AlterTable
ALTER TABLE `Conversations` DROP COLUMN `announcementId`;
