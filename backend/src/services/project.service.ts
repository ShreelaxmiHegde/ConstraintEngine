import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { ExtractConstraintOutput } from "../schema.js";

export const createProjectInstance = async (
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

export const saveConstraints = async (
  projectId: string,
  data: ExtractConstraintOutput
) => {
  await prisma.project.update({
    where: { id: projectId },
    data: {
      extractedConstraints: data.constraints,
      architectureState: data.architectureState as Prisma.InputJsonValue,
      decisions: data.decisions,
      unresolvedQuestions: data.unresolvedQuestions
    }
  });
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