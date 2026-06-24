import express from "express";
import { findOrCreateConversation } from "../controller/conversation.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();

router.route("/")
  .post(
    asyncWrapper(findOrCreateConversation)
  )

export default router;