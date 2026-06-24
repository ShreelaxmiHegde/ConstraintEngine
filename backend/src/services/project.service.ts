import prisma from "../lib/prisma.js";
import { ExtractConstraintOutput } from "../schemas/extract.schema.js";
import { ExpressError } from "../utils/ExpressError.js";
import * as archVersion from "./architectureVersion.service.js"

export const createInstance = async (
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

  await archVersion.createInstance(
    projectId,
    project,
    data
  );

  return;
}

export const fetchAll = async (userId: string) => {
  const project = await prisma.project.findMany({
    where: { userId }
  });

  return project;
}

export const findById = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  return project;
}

export const updateVersion = async (projectId: string) => {
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