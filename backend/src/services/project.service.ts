import prisma from "../lib/prisma.js";
import { ExtractConstraintOutput } from "../schemas/extract.schema.js";
import { ExpressError } from "../utils/ExpressError.js";
import * as archVersion from "./architectureVersion.service.js"

export const createInstance = async (
  ownerId: string,
  rawDescription: string
) => {
  const project = await prisma.project.create({
    data: {
      ownerId,
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

export const fetchAll = async (ownerId: string) => {
  const project = await prisma.project.findMany({
    where: { ownerId }
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
  });

  return;
}

export const fetchAllIn = async (projectId: string) => {
  const data = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      rawDescription: true,
      extractedConstraints: true,
      currentArchitectureVersion: true,

      conversation: {
        select: {
          exchanges: {
            select: {
              queryText: true,
              responseText: true
            }
          }
        }
      },

      architectureVersions: {
        orderBy: { createdAt: 'desc' },

        select: {
          version: true,
          summary: true,
          architectureState: true,
          decisions: true,

          changes: {
            select: {
              changeType: true,
              target: true,
              newValue: true,
              oldValue: true,
              reasoning: true
            }
          }
        }
      }
    }
  });

  return data;
}