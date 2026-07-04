import { Request, Response } from "express"
import { fastapiURL } from "../constants.js";
import { ExtractConstraintOutputSchema } from "../schemas/extract.schema.js";
import * as project from "../services/project.service.js";
import * as user from "../services/user.service.js";
import { saveConstraints } from "../services/project.service.js";
import { ExpressError } from "../utils/ExpressError.js";
import { ProjectInputBody } from "../schemas/classifier.schema.js";
import { verifyToken } from "../utils/token.js";


export const createProject = async (req: Request<{}, {}, ProjectInputBody>, res: Response) => {
  const { rawDescription } = req.body;

  if (req.cookies?.access_token) {
    verifyToken(req, req.cookies?.access_token);
  }

  const userId = req.user?.userId;
  let ownerId = userId;

  if (!userId) {
    const guestUser = await user.createGuest();
    ownerId = guestUser.id;
  }

  if (!(typeof ownerId === "string")) throw new ExpressError("Invalid user ID", 401);

  // save raw data
  const projectData = await project.createInstance(ownerId, rawDescription);

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
    projectId: projectData.id,
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

export const getProjectData = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new ExpressError("Unauthorized access", 401);

  const projectId = req.params.id;
  if (!(typeof projectId === "string")) throw new ExpressError("No project found.", 404);

  const data = await project.fetchAllIn(projectId);
  if (!data) throw new ExpressError("No project found", 404);

  return res.status(201).json({
    project: {
      desc: data.rawDescription,
      constraints: data.extractedConstraints,
      version: data.currentArchitectureVersion
    },
    conversation: data.conversation,
    archVersions: data.architectureVersions,
  });
}