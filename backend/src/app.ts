import express from 'express';
import cors from 'cors';
import messageRouter from './routes/conversation.route.js';
import { errorHandler } from './utils/error.middleware.js';

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use("/m", messageRouter);


export default app;