/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Conversations` table. All the data in the column will be lost.
  - You are about to drop the column `userId1` on the `Conversations` table. All the data in the column will be lost.
  - You are about to drop the column `userId2` on the `Conversations` table. All the data in the column will be lost.
  - You are about to drop the `_UserConversations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lastMessageId]` on the table `Conversations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userReceiver` to the `Conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSender` to the `Conversations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_UserConversations` DROP FOREIGN KEY `_UserConversations_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserConversations` DROP FOREIGN KEY `_UserConversations_B_fkey`;

-- AlterTable
ALTER TABLE `Conversations` DROP COLUMN `createdAt`,
    DROP COLUMN `userId1`,
    DROP COLUMN `userId2`,
    ADD COLUMN `lastMessageId` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userReceiver` INTEGER NOT NULL,
    ADD COLUMN `userSender` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_UserConversations`;

-- CreateIndex
CREATE UNIQUE INDEX `Conversations_lastMessageId_key` ON `Conversations`(`lastMessageId`);

-- AddForeignKey
ALTER TABLE `Conversations` ADD CONSTRAINT `Conversations_userSender_fkey` FOREIGN KEY (`userSender`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversations` ADD CONSTRAINT `Conversations_userReceiver_fkey` FOREIGN KEY (`userReceiver`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversations` ADD CONSTRAINT `Conversations_lastMessageId_fkey` FOREIGN KEY (`lastMessageId`) REFERENCES `Messages`(`id_message`) ON DELETE SET NULL ON UPDATE CASCADE;
