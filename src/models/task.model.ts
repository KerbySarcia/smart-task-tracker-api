import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: String,
    description: String,
    dueDate: Date,
    priority: String,
    tags: [String],
    completed: { type: Boolean, default: false },
    reminderAt: Date,
    attachmentUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
