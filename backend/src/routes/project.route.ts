import express from 'express';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { createProject, getProjects, getProjectData } from '../controller/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { sanitizeProjectInput } from '../middleware/sanitize.middleware.js';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { ProjectInputSchema } from '../schemas/classifier.schema.js';
import { projectIntentClassifier } from '../middleware/classifier.middleware.js';
import { projectRateLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

router.route("/")
  .post(
    authenticate,
    asyncWrapper(validateBody(ProjectInputSchema)),
    asyncWrapper(sanitizeProjectInput),
    asyncWrapper(projectIntentClassifier),
    asyncWrapper(projectRateLimiter),
    asyncWrapper(createProject)
  )
  .get(
    authenticate,
    asyncWrapper(getProjects)
  )

router.route("/:id")
  .get(
    authenticate,
    asyncWrapper(getProjectData)
  )

export default router;