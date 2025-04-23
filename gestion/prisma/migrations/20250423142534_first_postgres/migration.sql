-- CreateTable
CREATE TABLE "Users" (
    "id_user" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "postal_code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id_category" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "id_announcement" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id_announcement")
);

-- CreateTable
CREATE TABLE "Conversations" (
    "id_conversation" SERIAL NOT NULL,
    "userSender" INTEGER NOT NULL,
    "userReceiver" INTEGER NOT NULL,
    "lastMessageId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "announcementId" INTEGER NOT NULL,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id_conversation")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id_message" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userIdSender" INTEGER NOT NULL,
    "userIdReceiver" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "announcementId" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id_message")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mail_key" ON "Users"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Conversations_lastMessageId_key" ON "Conversations"("lastMessageId");

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "Conversations_userSender_fkey" FOREIGN KEY ("userSender") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "Conversations_userReceiver_fkey" FOREIGN KEY ("userReceiver") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "Conversations_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "Messages"("id_message") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "Conversations_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id_announcement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id_announcement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userIdSender_fkey" FOREIGN KEY ("userIdSender") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userIdReceiver_fkey" FOREIGN KEY ("userIdReceiver") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id_conversation") ON DELETE RESTRICT ON UPDATE CASCADE;
