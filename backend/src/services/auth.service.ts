import { RefreshToken } from "@prisma/client";
import prisma from "../lib/prisma.js"


export const createRefreshToken = async (
  userId: string,
  tokenHash: string,
  jwtId: string,
  ip: string,
  userAgent: string,
  expiresAt: Date
) => {
  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      jwtId,
      expiresAt,
      ip,
      userAgent
    }
  });
}

export const updateTokenHash = async (tokenHash: string, jwtId: string) => {
  const doc = await prisma.refreshToken.findFirst({
    where: { tokenHash, jwtId }
  });

  return doc;
}

export const findDoc = async (tokenHash: string) => {
  const doc = prisma.refreshToken.findFirst({ where: { tokenHash } });

  return doc;
}

export const updateRevokedDoc = async (doc: RefreshToken) => {
  await prisma.refreshToken.update({
    where: { id: doc.id },
    data: { revokedAt: new Date() }
  });
}