import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { ExtractConstraintOutput } from "../schemas/extract.schema.js";
import { ArchitectureChange, ArchitectureVersion } from "../schemas/architect.schema.js";
import { ExpressError } from "../utils/ExpressError.js";

export const createProjectInstance = async (
  userId: string,
  rawDescription: string
) => {
  const project = await prisma.project.create({
    data: {
      userId,
      rawDescription
    }
  });

  return project;
}

export const saveConstraints = async (
  projectId: string,
  data: ExtractConstraintOutput
) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      extractedConstraints: data.constraints,
    }
  });

  await prisma.architectureVersion.create({
    data: {
      projectId,
      version: project.currentArchitectureVersion,
      summary: data.summary,
      decisions: data.decisions,
      architectureState: data.architectureState as Prisma.InputJsonValue,
    }
  })
}

export const updateProjectWithResponse = async ( //DEPRECATE
  projectId: string,
  extractedConstraints: Prisma.InputJsonValue,
  architectureState: Prisma.InputJsonValue,
  decisions: Prisma.InputJsonValue
) => {
  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      extractedConstraints,
      architectureState,
      decisions
    }
  });

  return updatedProject;
}

export const fetchProject = async (userId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: "aa0966e3-5773-4d65-a5c8-a647a399e9dd" }
  });

  return project;
}

export const findById = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  return project;
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

export const updateArchitectureChanges = async (
  architectureVersionId: string,
  changes: ArchitectureChange[]
) => {
  await prisma.architectureChange.createMany({
    data: changes.map((change) => ({
      architectureVersionId,
      changeType: change.changeType,
      target: change.target,
      oldValue: change.oldVal as Prisma.InputJsonValue,
      newValue: change.newVal as Prisma.InputJsonValue,
      reasoning: change.reasoning,
    })),
  });
};

export const updateArchitectureVersion = async (
  projectId: string,
  newVersion: ArchitectureVersion
) => {

  const project = await findById(projectId);
  if (!project) throw new ExpressError("No project found", 404);

  const newVersionNum = project?.currentArchitectureVersion + 1;

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

export const updateProjectVersion = async (projectId: string) => {
  const project = await findById(projectId);
  if (!project) throw new ExpressError("No project found", 404);

  const newVersion = project.currentArchitectureVersion + 1;

  await prisma.project.update({
    where: { id: projectId },
    data: {
      currentArchitectureVersion: newVersion,
      updatedAt: new Date()
    }
  })
}