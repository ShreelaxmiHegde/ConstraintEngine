/*
  Warnings:

  - You are about to drop the column `unreslolvedQuestions` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "unreslolvedQuestions",
ADD COLUMN     "unresolvedQuestions" JSONB;
