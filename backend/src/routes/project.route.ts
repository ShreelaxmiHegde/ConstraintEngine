import express from 'express';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { createProject, getProjects } from '../controller/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/")
  .post(
    authenticate,
    asyncWrapper(createProject)
  )
  .get(
    authenticate,
    asyncWrapper(getProjects)
  )

export default router;