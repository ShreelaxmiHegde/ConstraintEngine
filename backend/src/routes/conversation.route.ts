import express from "express";
import { createGuestSession } from "../controller/conversation.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();

router.route("/")
  .post(
    asyncWrapper(createGuestSession)
  )

export default router;