import express from "express";
import * as user from "../controller/auth.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();

router.route("/")
  .post(asyncWrapper(user.create))

export default router;