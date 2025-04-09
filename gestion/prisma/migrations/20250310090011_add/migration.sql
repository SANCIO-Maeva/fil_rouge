/*
  Warnings:

  - You are about to drop the column `city` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postal_code` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `UserSkills` DROP FOREIGN KEY `UserSkills_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSkills` DROP FOREIGN KEY `UserSkills_userId_fkey`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `city`,
    DROP COLUMN `country`,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `postal_code` INTEGER NOT NULL,
    MODIFY `phone` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Skills`;

-- DropTable
DROP TABLE `UserSkills`;
