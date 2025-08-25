import { Schema, model } from "mongoose";

const SessionSchema = new Schema({
  expo: { type: Schema.Types.ObjectId, ref: "Expo", required: true, index: true },
  title: { type: String, required: true },
  description: String,
  speaker: String,
  location: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
}, { timestamps: true });

export default model("Session", SessionSchema);
