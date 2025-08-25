import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  expo: { type: Schema.Types.ObjectId, ref: "Expo", index: true },
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true }
}, { timestamps: true });

export default model("Message", MessageSchema);
