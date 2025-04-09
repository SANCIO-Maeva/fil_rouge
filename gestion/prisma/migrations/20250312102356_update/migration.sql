/*
  Warnings:

  - Made the column `latitude` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;
