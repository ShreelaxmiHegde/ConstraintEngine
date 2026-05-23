import prisma from "../lib/prisma.js";

export const saveMessage = async (conversationId: string, content: string) => {
  const tokenLen = content.trim().length;

  const message = await prisma.message.create({
    data: {
      conversationId: conversationId,
      content: content,
      role: conversationId ? "user" : "guest",
      tokenLen: tokenLen
    }
  });

  return message;
}