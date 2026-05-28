import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { LoginBody, SignUpBody } from "../types.js";
import { checkUser, createUser } from "../services/user.service.js";
import { ExpressError } from "../utils/ExpressError.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SALT = process.env.JWT_SALT;

export const signUp = async (req: Request<{}, {}, SignUpBody>, res: Response) => {
  console.log("Signup Request: ", req.body);
  const { username, email, password } = req.body

  if (!JWT_SALT) throw new ExpressError("Missing JWT salt", 500);

  const passwordHash = bcrypt.hashSync(password, JWT_SALT);

  const registerUser = await createUser(username, email, passwordHash);

  return res.status(200).json({
    message: "User registered successfully",
    user: {
      username: registerUser.username,
      email: registerUser.email
    }
  });
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  console.log("Login Request: ", req.body);
  const { email, password } = req.body;

  const user = await checkUser(email);

  const isMatch = bcrypt.compareSync(password, user?.passwordHash);

  if (!isMatch) throw new ExpressError("Invalid credentials", 401)
  if (!JWT_SECRET) throw new ExpressError("Missing JWT secret", 500);

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(200).json({
    success: true,
    message: "Login was successful",
    token
  });
}