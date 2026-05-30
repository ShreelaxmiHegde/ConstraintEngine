/*
  Warnings:

  - You are about to drop the column `expireAt` on the `GuestSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conversationId,sequenceNumber]` on the table `Exchange` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `contextSnapshot` on the `Conversation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `expiresAt` to the `GuestSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "contextSnapshot",
ADD COLUMN     "contextSnapshot" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "sequenceNumber" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "GuestSession" DROP COLUMN "expireAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "guestSessionId" UUID,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "jwtId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "replacedBy" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jwtId_key" ON "RefreshToken"("jwtId");

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_conversationId_sequenceNumber_key" ON "Exchange"("conversationId", "sequenceNumber");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_guestSessionId_fkey" FOREIGN KEY ("guestSessionId") REFERENCES "GuestSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
