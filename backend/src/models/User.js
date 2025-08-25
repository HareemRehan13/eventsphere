import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export const Roles = ["Admin", "Organizer", "Exhibitor", "Attendee"];

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: Roles, default: "Attendee" },
  company: { type: String },
  bio: { type: String },
  avatarUrl: { type: String }
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default model("User", UserSchema);
