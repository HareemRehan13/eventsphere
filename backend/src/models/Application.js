import { Schema, model } from "mongoose";

const ApplicationSchema = new Schema({
  expo: { type: Schema.Types.ObjectId, ref: "Expo", required: true },
  exhibitor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  company: String,
  products: [String],
  notes: String
}, { timestamps: true });

ApplicationSchema.index({ expo: 1, exhibitor: 1 }, { unique: true });

export default model("Application", ApplicationSchema);
