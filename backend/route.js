import express from "express";
import { firstConvo } from "./controller.js";

const router = express.Router();

router.route("/")
  .post(firstConvo)

export default router;