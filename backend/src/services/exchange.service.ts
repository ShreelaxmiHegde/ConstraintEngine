import { Exchange } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { findById, findCurrArchitecture } from "./project.service.js";
import * as conversationService from "./conversation.service.js";


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
  const architectureVersion = await findCurrArchitecture(projectId, project?.currentArchitectureVersion);
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
      project?.decisions,
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

export const getExchanges = async (conversationId: string) => {
  const exchanges = await prisma.exchange.findMany({
    where: { conversationId: conversationId }
  });

  return exchanges;
}

export const saveMessage = async (conversationId: string, content: string) => {
  const tokenLen = content.trim().length;

  // const message = await prisma.message.create({
  //   data: {
  //     conversationId: conversationId,
  //     content: content,
  //     role: conversationId ? "user" : "guest",
  //     tokenLen: tokenLen
  //   }
  // });

  // return message;
}