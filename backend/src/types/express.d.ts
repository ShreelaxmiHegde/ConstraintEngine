import { JwtPayload } from "jsonwebtoken";
import { AuthPayload } from "./types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload
    }
  }
}