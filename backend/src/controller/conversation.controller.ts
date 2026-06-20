import "dotenv/config";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import { conversationBody } from "../types/types.js";
import { saveMessage } from "../services/message.service.js";
import { findOrCreateConversation } from "../services/conversation.service.js";
import { createProjectInstance, updateProjectWithResponse } from "../services/project.service.js";
import { fastapiURL } from "../constants.js";


export const startConversation = async (req: Request, res: Response) => {
  console.log(req.body.prompt);
  const { prompt, projectId } = req.body.prompt;
  const userId = req.user?.userId;

  // create conversation instance

  // create exchange instance

  // send prompt to agent

  // save agent response in exchange instance
}


export const createGuestSession = async (req: Request<{}, {}, conversationBody>, res: Response) => {
  console.log("Request got: ", req.body);
  const content = req.body.content;
  const title = content.split(' ').slice(0, 3).join(' ');

  // create guest user
  const guest = await prisma.guestSession.create({});
  const guestId = guest.id;
  console.log(guest);

  // create conversation
  const conversation = await findOrCreateConversation(undefined, guestId, title)
  const conversationId = conversation.id;
  console.log(conversation);

  // store query/message in that convo
  const message = await saveMessage(conversationId, content);
  console.log(message);

  const agentResponse = await fetch(`${fastapiURL}/m`, {
    method: "POST",
    body: JSON.stringify({ "query": content }),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await agentResponse.json();
  console.log(data.response);

  return res.json({
    reply: data
  });
}