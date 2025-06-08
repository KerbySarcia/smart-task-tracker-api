import express from "express";
import validateRequest from "../middlewares/validate-request.middleware";
import { loginUserValidator, registerUserValidator } from "../validators/user.validator";
import { login, registerUser } from "../controllers/user.controller";
const router = express.Router();

router.post("/register", validateRequest({ body: registerUserValidator }), registerUser);

router.post("/login", validateRequest({ body: loginUserValidator }), login);

export default router;
