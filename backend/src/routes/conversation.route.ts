import express from "express";
import { startConversation } from "../controller/conversation.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { validateBody } from "../middleware/validateBody.middleware.js";
import { PromptInputSchema } from "../schemas/classifier.schema.js";
import { sanitizePromptInput } from "../middleware/sanitize.middleware.js";
import { promptIntentClassifier } from "../middleware/classifier.middleware.js";
import { promptRateLimiter } from "../middleware/rateLimiter.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/")
  .post(
    authenticate,
    asyncWrapper(validateBody(PromptInputSchema)),
    asyncWrapper(sanitizePromptInput),
    asyncWrapper(promptRateLimiter),
    asyncWrapper(promptIntentClassifier),
    asyncWrapper(startConversation)
  )

export default router;