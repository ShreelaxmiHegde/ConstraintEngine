import "dotenv/config";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import { conversationBody } from "../types/types.js";
import { saveMessage } from "../services/exchange.service.js";
import * as conversation from "../services/conversation.service.js";
import { fastapiURL } from "../constants.js";
import { createContext } from "../services/exchange.service.js";
import { ArchitectureOutputSchema } from "../schemas/architect.schema.js";
import * as archVersion from "../services/architectureVersion.service.js";
import * as archChange from "../services/architectureChange.service.js";
import * as project from "../services/project.service.js";
import * as exchange from "../services/exchange.service.js";

export const findOrCreateConversation = async (req: Request, res: Response) => {
  console.log(req.body.prompt);
  let { prompt, projectId, conversationId } = req.body;

  if (!conversationId) {
    // create conversation instance
    const convData = await conversation.createInstance(projectId);
    conversationId = convData.id;
  }

  // generate context
  const context = await createContext(
    projectId,
    conversationId,
    prompt
  );

  // create exchange instance
  const exchangeInstance = await exchange.createInstance(conversationId, prompt);

  // send prompt to agent
  const response = await fetch(`${fastapiURL}/architecture/respond`, {
    method: "POST",
    body: JSON.stringify({ "query_context": context }),
    headers: { 'Content-Type': 'application/json' }
  });

  const rawData = await response.json();
  const data = ArchitectureOutputSchema.parse(rawData);
  console.log(data);

  // save agent response in exchange instance
  const exchangeData = await exchange.addResponse(
    exchangeInstance.id,
    data.conversation
  );

  if (data.projectModified && data.newVersion) {
    // update ArchitectureVersion
    const newArchVersion = await archVersion.createNew(projectId, data.newVersion);

    // update ArchitectureChange
    await archChange.createManyChanges(newArchVersion.id, data.changes);

    // update project version
    await project.updateVersion(projectId);
  }

  return res.status(201).json({
    success: true,
    response: exchangeData.responseText
  });
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
  const convData = await conversation.findOrCreate(undefined, guestId, title)
  const conversationId = convData.id;
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