import "dotenv/config";
import { Request, Response } from "express";
import * as conversation from "../services/conversation.service.js";
import { fastapiURL } from "../constants.js";
import { createContext } from "../services/exchange.service.js";
import { ArchitectureOutputSchema } from "../schemas/architect.schema.js";
import * as archVersion from "../services/architectureVersion.service.js";
import * as archChange from "../services/architectureChange.service.js";
import * as project from "../services/project.service.js";
import * as exchange from "../services/exchange.service.js";
import { ExpressError } from "../utils/ExpressError.js";

export const startConversation = async (req: Request, res: Response) => {
  console.log(req.body.prompt);
  let { prompt, projectId, conversationId } = req.body;

  const conversationData = await conversation.findById(conversationId);

  if (!conversationData) throw new ExpressError("no conversation found", 403);

  // generate context
  const context = await createContext(
    projectId,
    conversationId,
    prompt
  );

  // create exchange instance
  const exchangeInstance = await exchange.createInstance(conversationData.id, prompt);

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

  if (data.newVersion) {
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