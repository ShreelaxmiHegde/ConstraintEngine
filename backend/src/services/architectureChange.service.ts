import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { ArchitectureChange } from "../schemas/architect.schema.js";


export const createManyChanges = async (
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