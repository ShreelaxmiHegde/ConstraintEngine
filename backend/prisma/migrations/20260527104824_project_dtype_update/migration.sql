-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "extractedConstraints" DROP NOT NULL,
ALTER COLUMN "architectureState" DROP NOT NULL,
ALTER COLUMN "decisions" DROP NOT NULL,
ALTER COLUMN "unreslolvedQuestions" DROP NOT NULL;
