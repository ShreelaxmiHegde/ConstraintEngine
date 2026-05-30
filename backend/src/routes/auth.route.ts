import express from "express";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { login, logout, refresh, signUp } from "../controller/auth.controller.js";

const router = express.Router();

router.route("/signup").post(asyncWrapper(signUp));
router.route("/login").post(asyncWrapper(login));
router.route("/refresh").post(asyncWrapper(refresh));
router.route("/logout").post(asyncWrapper(logout));


export default router;