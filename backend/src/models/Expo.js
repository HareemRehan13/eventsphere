import { Schema, model } from "mongoose";

const ExpoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  theme: { type: String },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  location: { type: String, required: true },
  floorplanUrl: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default model("Expo", ExpoSchema);
