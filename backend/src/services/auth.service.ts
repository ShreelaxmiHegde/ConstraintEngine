import prisma from "../lib/prisma.js"


export const create = async (
  userId: string,
  tokenHash: string,
  jwtId: string,
  ip: string,
  userAgent: string,
  expiresAt: Date
) => {
  await prisma.refreshSession.create({
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

export const findByTokenAndJti = async (tokenHash: string, jwtId: string) => {
  const session = await prisma.refreshSession.findUnique({
    where: { tokenHash, jwtId }
  });

  return session;
}

export const findByTokenHash = async (tokenHash: string) => {
  const session = prisma.refreshSession.findFirst({ where: { tokenHash } });

  return session;
}

export const revoke = async (sessionId: string) => {
  await prisma.refreshSession.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() }
  });
}