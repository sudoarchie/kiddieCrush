-- CreateTable
CREATE TABLE "crush" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "crushedUserId" INTEGER NOT NULL,

    CONSTRAINT "crush_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "instagram" TEXT,
    "tweeter" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crush_userId_crushedUserId_key" ON "crush"("userId", "crushedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_instagram_key" ON "User"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "User_tweeter_key" ON "User"("tweeter");

-- AddForeignKey
ALTER TABLE "crush" ADD CONSTRAINT "crush_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crush" ADD CONSTRAINT "crush_crushedUserId_fkey" FOREIGN KEY ("crushedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
