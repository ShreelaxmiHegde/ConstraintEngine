/*
  Warnings:

  - You are about to drop the column `architectureState` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `decisions` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `unresolvedQuestions` on the `Project` table. All the data in the column will be lost.
  - Made the column `projectId` on table `Conversation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_projectId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL,
ALTER COLUMN "contextSnapshot" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "architectureVersionId" UUID,
ADD COLUMN     "exchangeIntent" TEXT,
ADD COLUMN     "stateChanged" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "responseText" DROP NOT NULL,
ALTER COLUMN "sequenceNumber" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "architectureState",
DROP COLUMN "decisions",
DROP COLUMN "unresolvedQuestions",
ADD COLUMN     "currentArchitectureVersion" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ArchitectureVersion" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "parentVersionId" UUID,
    "version" INTEGER NOT NULL,
    "summary" TEXT,
    "architectureState" JSONB NOT NULL,
    "decisions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchitectureVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchitectureChange" (
    "id" UUID NOT NULL,
    "architectureVersionId" UUID NOT NULL,
    "changeType" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "reasoning" TEXT,

    CONSTRAINT "ArchitectureChange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_architectureVersionId_fkey" FOREIGN KEY ("architectureVersionId") REFERENCES "ArchitectureVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureVersion" ADD CONSTRAINT "ArchitectureVersion_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureChange" ADD CONSTRAINT "ArchitectureChange_architectureVersionId_fkey" FOREIGN KEY ("architectureVersionId") REFERENCES "ArchitectureVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
