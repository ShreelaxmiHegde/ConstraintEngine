import "dotenv/config";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import { conversationBody } from "../types/types.js";
import { saveMessage } from "../services/exchange.service.js";
import { createConversationInstance, findOrCreateConversation } from "../services/conversation.service.js";
import { fastapiURL } from "../constants.js";
import { addExchangeResponse, createExchangeInstance } from "./exchange.controller.js";
import { createContext } from "../services/exchange.service.js";
import { ArchitectureOutputSchema } from "../schemas/architect.schema.js";
import { updateArchitectureChanges } from "../services/project.service.js";

export const startConversation = async (req: Request, res: Response) => {
  console.log(req.body.prompt);
  const { prompt, projectId } = req.body.prompt;

  // create conversation instance
  const converstation = await createConversationInstance(projectId);

  // generate context
  const context = await createContext(
    projectId,
    converstation.id,
    prompt
  );

  // create exchange instance
  const exchangeInstance = await createExchangeInstance(converstation.id, prompt);

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
  const exchange = await addExchangeResponse(
    exchangeInstance.id,
    data.conversation
  );

  if (data.projectModified) {
    await updateArchitectureChanges(architectureVersionId, data.changes);
  }

  return res.status(201).json({
    success: true,
    response: exchange.responseText
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