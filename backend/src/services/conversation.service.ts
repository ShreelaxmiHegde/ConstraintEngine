import prisma from "../lib/prisma.js";

export const createConversationInstance = async (
  projectId: string
) => {
  const conversation = await prisma.conversation.create({
    data: { projectId: projectId }
  });

  return conversation;
}

export const findOrCreateConversation = async (conversationId: string | undefined, guestId: string, title: string) => {
  // Existing conversation
  if (conversationId) {
    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId }
    })

    if (existingConversation) {
      return existingConversation;
    }
  }

  // Create new conversation
  const newConversation = await prisma.conversation.create({
    data: {
      title: title,
      guestId: guestId
    }
  });

  return newConversation;
}

export const findById = async (conversationId: string) => {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId }
  });

  return conversation;
}