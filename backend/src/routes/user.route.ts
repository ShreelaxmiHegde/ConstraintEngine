import express from "express";
import { createUser } from "../controller/user.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();

router.route("/")
  .post(asyncWrapper(createUser))

export default router;