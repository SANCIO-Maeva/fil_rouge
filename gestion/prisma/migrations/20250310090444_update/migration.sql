/*
  Warnings:

  - Made the column `bio` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `bio` VARCHAR(191) NOT NULL;
