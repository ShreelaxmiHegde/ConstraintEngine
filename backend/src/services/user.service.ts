import { emitWarning } from "node:process";
import prisma from "../lib/prisma.js"
import { ExpressError } from "../utils/ExpressError.js";

export const createUser = async (
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

export const checkUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) throw new ExpressError("User not found", 404);

  return user;
}

export const checkExistingUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (user) throw new ExpressError("User already exist", 404);

  return;
}