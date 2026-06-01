import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import messageRouter from './routes/conversation.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use("/auth", authRouter);
app.use("/m", messageRouter);

export default app;