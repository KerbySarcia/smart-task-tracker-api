import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    hashed_password: { type: String, requried: true },
    profile_image: { type: mongoose.Types.ObjectId, ref: "File", default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
