import { Schema, model } from "mongoose";

const BoothSchema = new Schema({
  expo: { type: Schema.Types.ObjectId, ref: "Expo", index: true, required: true },
  boothName: { type: String, required: true },
  size: { type: String },
  price: { type: Number, default: 0 },
  bookedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

export default model("Booth", BoothSchema);
