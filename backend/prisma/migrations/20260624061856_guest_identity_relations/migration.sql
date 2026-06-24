/*
  Warnings:

  - You are about to drop the column `guestSessionId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `GuestSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuestSession" DROP CONSTRAINT "GuestSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_guestSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "guestSessionId",
DROP COLUMN "userId",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- DropTable
DROP TABLE "GuestSession";

-- CreateTable
CREATE TABLE "GuestIdentity" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestIdentity_pkey" PRIMARY KEY ("id")
);
