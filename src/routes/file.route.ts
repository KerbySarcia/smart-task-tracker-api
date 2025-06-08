import express from "express";
import upload from "../middlewares/upload";
import { getFile, uploadMultipleFiles, uploadSingleFile } from "../controllers/file.controller";
import verifyAuth from "../middlewares/verify-auth.middleware";
import validateRequest from "../middlewares/validate-request.middleware";
import { objectIdFileValidator } from "../validators/file.validator";

const router = express.Router();

router.post("/single-upload", verifyAuth, upload.single("image"), uploadSingleFile);

router.post("/multiple-upload", verifyAuth, upload.array("images"), uploadMultipleFiles);

router.get("/:id", validateRequest({ params: objectIdFileValidator }), verifyAuth, getFile);

export default router;
