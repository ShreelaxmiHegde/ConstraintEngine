import "dotenv/config";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import { conversationBody } from "../types.js";

const fastapiURL = process.env.FASTAPI_URL;

export const createGuestSession = async (req: Request<{}, {}, conversationBody>, res: Response) => {
  console.log("Request got: ", req.body);
  const content = req.body.content;
  const title = content.split(' ').slice(0, 3).join(' ');
  const tokenLen = content.trim().length;

  // create guest user
  const guest = await prisma.guest.create({});
  const guestId = guest.id;
  console.log(guest);

  // create conversation
  const conversation = await prisma.conversation.create({
    data: {
      title: title,
      guestId: guestId
    }
  });
  console.log(conversation);

  // store query/message in that convo
  const conversationId = conversation.id;

  const message = await prisma.message.create({
    data: {
      conversationId: conversationId,
      content: content,
      role: "user",
      tokenLen: tokenLen
    }
  });
  console.log(message);

  const agentResponse = await fetch(`${fastapiURL}/m`, {
    method: "POST",
    body: JSON.stringify({ "query": content }),
    headers: { 'Content-Type': 'application/json' }
  });

  console.log(agentResponse);

  return res.json({
    data: {
      messageId: message.id,
      message: message.content
    }
  });
}
