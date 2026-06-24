import { Request, Response } from "express"
import { fastapiURL } from "../constants.js";
import { ExtractConstraintOutputSchema } from "../schemas/extract.schema.js";
import * as project from "../services/project.service.js";
import { saveConstraints } from "../services/project.service.js";
import { ExpressError } from "../utils/ExpressError.js";

export const createProject = async (req: Request, res: Response) => {
  const { rawDescription } = req.body;
  const userId = req.user?.userId;
  console.log(rawDescription, userId);

  if (!(typeof userId === "string")) throw new ExpressError("Invalid user ID", 401);

  // save raw data
  const projectData = await project.createInstance(userId, rawDescription);

  // TODO: input sanitization

  // extract constraints from agent
  const response = await fetch(`${fastapiURL}/extract/constraints`, {
    method: "POST",
    body: JSON.stringify({ description: rawDescription }),
    headers: { 'Content-Type': 'application/json' }
  });

  const rawData = await response.json();
  const data = ExtractConstraintOutputSchema.parse(rawData);
  console.log(data);

  // save agent extracted constraint
  await saveConstraints(projectData.id, data);

  return res.status(201).json({
    constraints: data,
    message: "Project created successfully"
  });
}

export const getProjects = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new ExpressError("Unauthorized access", 401);
  console.log(user);

  const projects = await project.fetchAll(user?.userId);
  if (!projects) throw new ExpressError("No content", 404);

  console.log(projects);
  return res.status(200).json({
    success: true,
    projects
  });
}