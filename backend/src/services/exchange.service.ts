import { Exchange } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { findById } from "./project.service.js";
import * as conversationService from "./conversation.service.js";
import * as archVersion from "./architectureVersion.service.js";
import { ExpressError } from "../utils/ExpressError.js";
import * as schema from "../schemas/architect.schema.js";


const flattenExchanges = (exchanges: Exchange[]): string => {
  return exchanges
    .map(
      (exchange) =>
        `User: ${exchange.queryText}\nAssistant: ${exchange.responseText ?? ""}`
    )
    .join("\n\n");
};

export const createContext = async (
  projectId: string,
  conversationId: string,
  query: string
) => {

  const project = await findById(projectId);
  if (!project) throw new ExpressError("No project found", 404);

  const architectureVersion = await archVersion.findCurrArchitecture(projectId, project.currentArchitectureVersion);
  if (!architectureVersion) throw new ExpressError("No relevent architecture version data found", 404);

  const exchanges = await getExchanges(conversationId);
  const conversation = await conversationService.findById(conversationId);

  const sections = [
    `PROJECT DESCRIPTION:\n${project?.rawDescription}`,

    `CONSTRAINTS:\n${JSON.stringify(
      project?.extractedConstraints,
      null,
      2
    )}`,

    `CURRENT ARCHITECTURE STATE:\n${JSON.stringify(
      architectureVersion.architectureState,
      null,
      2
    )}`,

    `DECISIONS:\n${JSON.stringify(
      architectureVersion.decisions,
      null,
      2
    )}`,

    `USER QUERY:\n${query}`,
  ];

  const recentExchanges = flattenExchanges(exchanges);

  if (recentExchanges.trim()) {
    sections.push(`RECENT EXCHANGES:\n${recentExchanges}`);
  }

  if (conversation?.contextSnapshot) {
    sections.push(
      `CONVERSATION SUMMARY:\n${conversation.contextSnapshot}`
    );
  }

  return sections.join("\n\n");
};

export const createInstance = async (
  conversationId: string,
  queryText: string
) => {
  const exchangeData = await prisma.exchange.create({
    data: {
      conversationId: conversationId,
      queryText: queryText
    }
  });

  return exchangeData;
}

export const getExchanges = async (conversationId: string) => {
  const exchanges = await prisma.exchange.findMany({
    where: { conversationId }
  });

  return exchanges;
}

export const addResponse = async (
  exchangeId: string,
  exchange: schema.Exchange
) => {
  const exchangeData = await prisma.exchange.update({
    where: { id: exchangeId },
    data: {
      responseText: exchange.responseText,
      exchangeIntent: exchange.exchangeIntent,
      stateChanged: exchange.stateChanged
    }
  });

  return exchangeData;
}

export const getByDescOrder = async (
  conversationId: string
) => {
  const exchanges = await prisma.exchange.findMany({
    where: { conversationId: conversationId },
    orderBy: { createdAt: 'desc' }
  });

  return exchanges;
}