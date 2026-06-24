import { Prisma, Project } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { ExtractConstraintOutput } from "../schemas/extract.schema.js";
import { ArchitectureVersion } from "../schemas/architect.schema.js";
import { ExpressError } from "../utils/ExpressError.js";
import * as project from "./project.service.js";


export const createInstance = async (
  projectId: string,
  project: Project,
  data: ExtractConstraintOutput
) => {
  await prisma.architectureVersion.create({
    data: {
      projectId,
      version: project.currentArchitectureVersion,
      summary: data.summary,
      decisions: data.decisions,
      architectureState: data.architectureState as Prisma.InputJsonValue,
    }
  });

  return;
}

export const findCurrArchitecture = async (
  projectId: string,
  version: number
) => {
  const architectureVersion = await prisma.architectureVersion.findUnique({
    where: {
      projectId_version: {
        projectId,
        version
      }
    }
  });

  return architectureVersion;
}

export const createNew = async (
  projectId: string,
  newVersion: ArchitectureVersion
) => {
  const projectData = await project.findById(projectId);
  if (!projectData) throw new ExpressError("No project found", 404);

  const newVersionNum = projectData?.currentArchitectureVersion + 1;

  const newArchVersion = await prisma.architectureVersion.create({
    data: {
      projectId,
      version: newVersionNum,
      summary: newVersion.summary,
      architectureState: newVersion.architectureState as Prisma.InputJsonValue,
      decisions: newVersion.decisions
    }
  });

  return newArchVersion;
}