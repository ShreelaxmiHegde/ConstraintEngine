import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3).max(15),
  email: z.string().min(10).max(30),
  password: z.string().min(3).max(10),
  guestId: z.string().optional()
});

export const LoginSchema = z.object({
  email: z.string().min(10).max(30),
  password: z.string().min(3).max(10)
});

export type SignUpBody = z.infer<typeof SignUpSchema>
export type LoginBody = z.infer<typeof LoginSchema>