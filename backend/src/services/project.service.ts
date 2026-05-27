import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";

export const createProject = async (
  userId: string,
  rawDescription: string
) => {
  const project = await prisma.project.create({
    data: {
      userId: userId,
      rawDescription: rawDescription
    }
  });

  return project;
}

export const updateProjectWithResponse = async (
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