import { Request, Response } from "express"
import prisma from "../lib/prisma.js";
import { fastapiURL } from "../constants.js";
import { ExtractConstraintOutputSchema } from "../schema.js";

export const extractConstraints = async (req: Request, res: Response) => {
  const { userId, rawDescription } = req.body;

  // save raw data
  const project = await prisma.project.create({
    data: { userId, rawDescription }
  });

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
  await prisma.project.update({
    where: { id: project.id },
    data: {
      extractedConstraints: data.constraints,
      architectureState: data.architectureState,
      decisions: data.decisions,
      unreslolvedQuestions: data.unresolvedQuestions
    }
  });

  return res.json({
    constraints: response
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