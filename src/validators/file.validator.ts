import mongoose from "mongoose";
import { z } from "zod";

const validateObjectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

export const objectIdFileValidator = z
  .object({
    id: validateObjectId,
  })
  .strict();
