import { z } from "zod";
import mongoose from "mongoose";

const validateObjectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character (e.g., !, @, #, $, %, etc.)");

export const registerUserValidator = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: passwordValidator,
    profile_image: validateObjectId.optional(),
  })
  .strict();

export const loginUserValidator = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
.strict();
