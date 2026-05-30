/*
  Warnings:

  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Guest";

-- CreateTable
CREATE TABLE "GuestSession" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuestSession" ADD CONSTRAINT "GuestSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
