/*
  Warnings:

  - Added the required column `conversationId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Messages` ADD COLUMN `conversationId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Conversations` (
    `id_conversation` INTEGER NOT NULL AUTO_INCREMENT,
    `userId1` INTEGER NOT NULL,
    `userId2` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_conversation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserConversations` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserConversations_AB_unique`(`A`, `B`),
    INDEX `_UserConversations_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversations`(`id_conversation`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserConversations` ADD CONSTRAINT `_UserConversations_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversations`(`id_conversation`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserConversations` ADD CONSTRAINT `_UserConversations_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
