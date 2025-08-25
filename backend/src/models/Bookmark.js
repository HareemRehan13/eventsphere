import { Schema, model } from "mongoose";

const BookmarkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  session: { type: Schema.Types.ObjectId, ref: "Session", required: true, index: true }
}, { timestamps: true });

BookmarkSchema.index({ user: 1, session: 1 }, { unique: true });

export default model("Bookmark", BookmarkSchema);
