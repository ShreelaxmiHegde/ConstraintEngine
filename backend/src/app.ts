import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import conversationRouter from './routes/conversation.route.js';
import authRouter from './routes/auth.route.js';
import projectRouter from './routes/project.route.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use("/auth", authRouter);
app.use("/ask", conversationRouter);
app.use("/project", projectRouter);

app.use(errorHandler);

export default app;