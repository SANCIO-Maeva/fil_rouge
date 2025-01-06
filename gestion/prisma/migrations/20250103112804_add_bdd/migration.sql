-- CreateTable
CREATE TABLE `Users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcements` (
    `id_announcement` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_announcement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id_message` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `id_user_sender` INTEGER NOT NULL,
    `id_user_receiver` INTEGER NOT NULL,
    `announcementId` INTEGER NOT NULL,

    PRIMARY KEY (`id_message`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Announcements` ADD CONSTRAINT `Announcements_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcements`(`id_announcement`) ON DELETE RESTRICT ON UPDATE CASCADE;
