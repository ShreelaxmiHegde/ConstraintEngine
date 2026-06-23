/*
  Warnings:

  - A unique constraint covering the columns `[projectId,version]` on the table `ArchitectureVersion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArchitectureVersion_projectId_version_key" ON "ArchitectureVersion"("projectId", "version");
