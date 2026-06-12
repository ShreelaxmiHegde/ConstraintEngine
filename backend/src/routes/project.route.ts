import express from 'express';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { extractConstraints, updateConstraints } from '../controller/project.controller.js';


const router = express.Router();

router.route("/new")
  .post(asyncWrapper(extractConstraints))
  .put(asyncWrapper(updateConstraints))

export default router;