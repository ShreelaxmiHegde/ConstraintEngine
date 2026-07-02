import express from "express";
import { findOrCreateConversation } from "../controller/conversation.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { validateBody } from "../middleware/validateBody.middleware.js";
import { PromptClassifierSchema } from "../schemas/classifier.schema.js";
import { sanitizePromptInput } from "../middleware/sanitize.middleware.js";
import { promptIntentClassifier } from "../middleware/classifier.middleware.js";
import { promptRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.route("/")
  .post(
    // asyncWrapper(validateBody(PromptClassifierSchema)),
    asyncWrapper(sanitizePromptInput),
    // asyncWrapper(promptIntentClassifier),
    asyncWrapper(promptRateLimiter),
    // asyncWrapper(findOrCreateConversation)
  )

export default router;