import mongoose from "mongoose";

const expoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    venue: { type: String, required: true },
    organizerName: { type: String, required: true },
    organizerContact: { type: String, required: true },

    // Booth counts per floor
    totalBooths: { type: Number, required: true },
    totalBoothsf2: { type: Number, default: 0 },
    totalBoothsf3: { type: Number, default: 0 },

    booths: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booth",
      },
    ],
  },
  { timestamps: true }
);

// const Expo = mongoose.model("Expo", expoSchema);
// export default Expo;
const Booth = mongoose.model("Booth",expoSchema);
export default Booth;