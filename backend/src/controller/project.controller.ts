import { Request, Response } from "express"
import prisma from "../lib/prisma.js";
import { fastapiURL } from "../constants.js";
import { ExtractConstraintOutputSchema } from "../schema.js";
import { createProjectInstance, fetchProject, saveConstraints } from "../services/project.service.js";
import { ExpressError } from "../utils/ExpressError.js";

export const createProject = async (req: Request, res: Response) => {
  const { rawDescription } = req.body;
  const userId = req.user?.userId;
  console.log(rawDescription, userId);

  if (!(typeof userId === "string")) throw new ExpressError("Invalid user ID", 401);

  // save raw data
  const project = await createProjectInstance(userId, rawDescription);

  // TODO: input sanitization

  // extract constraints from agent
  const response = await fetch(`${fastapiURL}/extract_constraints`, {
    method: "POST",
    body: JSON.stringify({ description: rawDescription }),
    headers: { 'Content-Type': 'application/json' }
  });

  const rawData = await response.json();
  const data = ExtractConstraintOutputSchema.parse(rawData);
  console.log(data);

  // save agent extracted constraint
  await saveConstraints(project.id, data);

  return res.status(201).json({
    constraints: data,
    message: "Project created successfully"
  });
}

export const updateConstraints = async (req: Request, res: Response) => {
  const { projectId, constraintUpdates } = req.body;

  await prisma.project.update({
    where: { id: projectId },
    data: {
      extractedConstraints: constraintUpdates
    }
  });

  return res.json({
    success: true
  });
}

export const getProject = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new ExpressError("Unauthorized access", 401);

  const project = await fetchProject(user?.userId);
  if (!project) throw new ExpressError("No content", 404);

  console.log(project);
  return res.status(200).json({
    success: true,
    project: project
  });
}