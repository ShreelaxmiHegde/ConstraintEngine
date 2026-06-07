import { Request, Response } from "express"
import prisma from "../lib/prisma.js";

export const extractConstraints = async (req: Request, res: Response) => {
  const { userId, rawDescription } = req.body;

  // save raw data
  const project = await prisma.project.create({
    data: { userId, rawDescription }
  });

  // TODO: input sanitization

  // extract constraints from agent
  // fastapi call -> 
  const response = { // demo response structure
    constraints: {
      scale: "1M",
      concurrentTraffic: "~25k"
    },
    architectureState: {
      abc: "abc"
    },
    decisions: {
      abc: "abc"
    },
    unresolvedQuestions: [
      "abc?", "bcd?", "pqr"
    ]
  }

  // save agent extracted constraint
  await prisma.project.update({
    where: { id: project.id },
    data: {
      extractedConstraints: response.constraints,
      architectureState: response.architectureState,
      decisions: response.decisions,
      unreslolvedQuestions: response.unresolvedQuestions
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