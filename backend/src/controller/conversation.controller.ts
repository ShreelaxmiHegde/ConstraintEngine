import "dotenv/config";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import { conversationBody } from "../types.js";
import { saveMessage } from "../services/message.service.js";
import { findOrCreateConversation } from "../services/conversation.service.js";
import { createProject, updateProjectWithResponse } from "../services/project.service.js";

const fastapiURL = process.env.FASTAPI_URL;

export const extractConstraints = async (req: Request<{}, {}, conversationBody>, res: Response) => {
  console.log("Request got: ", req.body);
  const content = req.body.content;

  // create guest user
  const guest = await prisma.guest.create({});
  const guestId = guest.id;
  console.log(guest);

  // create project
  const project = await createProject(guestId, content);

  const agentResponse = await fetch(`${fastapiURL}/m`, {
    method: "POST",
    body: JSON.stringify({ "query": content }),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await agentResponse.json();
  console.log(data.response);

  const updatedProject = await updateProjectWithResponse(
    project.id,
    data.response.architectureState,
    data.response.architectureState,
    data.response.decisions
  );

  return res.json({
    project: updatedProject
  });
}


export const createGuestSession = async (req: Request<{}, {}, conversationBody>, res: Response) => {
  console.log("Request got: ", req.body);
  const content = req.body.content;
  const title = content.split(' ').slice(0, 3).join(' ');

  // create guest user
  const guest = await prisma.guest.create({});
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