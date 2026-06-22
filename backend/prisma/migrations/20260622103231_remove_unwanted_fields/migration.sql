/*
  Warnings:

  - You are about to drop the column `parentVersionId` on the `ArchitectureVersion` table. All the data in the column will be lost.
  - You are about to drop the column `sequenceNumber` on the `Exchange` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Exchange_conversationId_sequenceNumber_key";

-- AlterTable
ALTER TABLE "ArchitectureVersion" DROP COLUMN "parentVersionId";

-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "sequenceNumber";
