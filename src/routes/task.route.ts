import express from "express";
import validateRequest from "../middlewares/validate-request.middleware";
import { createTaskValidator, getTasksValidator } from "../validators/task.validator";
import { createTask, getTasks } from "../controllers/task.controller";
import verifyAuth from "../middlewares/verify-auth.middleware";
const router = express.Router();

router.post("/", validateRequest({ body: createTaskValidator }), verifyAuth, createTask);

router.get("/", validateRequest({ query: getTasksValidator }), verifyAuth, getTasks);

export default router;
