import express from "express";
import { startConversation } from "../controller/conversation.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();

router.route("/")
  .post(
    asyncWrapper(startConversation)
  )

export default router;