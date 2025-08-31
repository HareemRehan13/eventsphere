import mongoose from "mongoose";

const { Schema } = mongoose;

const analyticsSchema = new Schema(
  {
    expo: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
    booth: { type: mongoose.Schema.Types.ObjectId, ref: "Booth" },
    session: { type: String }, // Session title
    attendeeCount: { type: Number, default: 0 },
    boothVisits: { type: Number, default: 0 },
    sessionPopularity: { type: Number, default: 0 }, // e.g., number of attendees attended session
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
