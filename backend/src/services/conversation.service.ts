import prisma from "../lib/prisma.js";

export const createInstance = async (
  projectId: string
) => {
  const conversation = await prisma.conversation.create({
    data: { projectId }
  });

  return conversation;
}

export const findById = async (conversationId: string) => {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId }
  });

  return conversation;
}