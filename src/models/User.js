import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String }, // null for Google users
  provider:  { type: String, default: "email" }, // "email" | "google"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);