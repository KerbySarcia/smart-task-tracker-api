import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true }, // Stored name (e.g., UUID or hash)
    originalName: { type: String, required: true }, // Original uploaded name
    mimetype: { type: String, required: true }, // e.g., 'image/png'
    size: { type: Number, required: true }, // in bytes
    path: { type: String, required: true }, // Path on disk or storage
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("File", fileSchema);
