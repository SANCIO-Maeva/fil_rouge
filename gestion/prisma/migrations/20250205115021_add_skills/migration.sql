-- CreateTable
CREATE TABLE `Skills` (
    `id_skill` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_skill`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skills` ADD CONSTRAINT `Skills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
