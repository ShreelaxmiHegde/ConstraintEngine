import prisma from "../lib/prisma.js"
import { ExpressError } from "../utils/ExpressError.js";

export const create = async (
  username: string,
  email: string,
  passwordHash: string
) => {

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash
    }
  });

  return user;
}

export const convertToUser = async (
  guestId: string,
  username: string,
  email: string,
  passwordHash: string,
) => {
  const user = await prisma.user.create({
    data: {
      id: guestId,
      username,
      email,
      passwordHash
    }
  });

  return user;
}

export const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  return user;
}

export const findById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) throw new ExpressError("User not found", 404);

  return user;
}

export const createGuest = async () => {
  const guestUser = await prisma.guestIdentity.create({});

  return guestUser;
}