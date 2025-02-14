/*
  Warnings:

  - You are about to drop the column `id_user_receiver` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_sender` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `userIdReceiver` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdSender` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_id_user_receiver_fkey`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_id_user_sender_fkey`;

-- DropIndex
DROP INDEX `Messages_id_user_receiver_fkey` ON `Messages`;

-- DropIndex
DROP INDEX `Messages_id_user_sender_fkey` ON `Messages`;

-- AlterTable
ALTER TABLE `Messages` DROP COLUMN `id_user_receiver`,
    DROP COLUMN `id_user_sender`,
    ADD COLUMN `userIdReceiver` INTEGER NOT NULL,
    ADD COLUMN `userIdSender` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_userIdSender_fkey` FOREIGN KEY (`userIdSender`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_userIdReceiver_fkey` FOREIGN KEY (`userIdReceiver`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
