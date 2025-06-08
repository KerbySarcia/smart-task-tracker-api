import mongoose from "mongoose";
import { z } from "zod";

const validateObjectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

export const createTaskValidator = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    dueDate: z.date().optional(),
    priority: z.string().optional(),
    tags: z.array(z.string()).optional(),
    reminderAt: z.date().optional(),
    attachmentUrl: z.string().optional(),
  })
  .strict();

export const getTasksValidator = z
  .object({
    limit: z.number().optional(),
    page: z.number().optional(),
    title: z.string().optional(),
    completed: z.boolean().optional(),
    priority: z.string().optional(),
  })
  .strict();
