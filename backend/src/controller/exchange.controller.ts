import prisma from "../lib/prisma.js"
import { Exchange } from "../schemas/architect.schema.js";


export const createExchangeInstance = async (
  conversationId: string,
  queryText: string
) => {
  const exchange = await prisma.exchange.create({
    data: {
      conversationId: conversationId,
      queryText: queryText
    }
  });

  return exchange;
}

export const addExchangeResponse = async (
  exchangeId: string,
  exchange: Exchange
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

export const getExchangesDescOrder = async (
  conversationId: string
) => {
  const exchanges = await prisma.exchange.findMany({
    where: { conversationId: conversationId },
    orderBy: { createdAt: 'desc' }
  });

  return exchanges;
}