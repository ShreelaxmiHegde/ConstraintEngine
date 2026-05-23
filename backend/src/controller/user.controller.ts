import prisma from "../lib/prisma.js"
import { Request, Response } from "express"
import { SignUpBody } from "../types.js";


export const createUser = async (req: Request<{}, {}, SignUpBody>, res: Response) => {
  const { username, email, password } = req.body;

  const createUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      passwordHash: password
    }
  })

  console.log(createUser);

  return res.json({
    message: "User created successfully"
  });
}