import mongoose from "mongoose";

const exhibitorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // har exhibitor ka ek user account hoga
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    boothNumber: {
      type: String,
      required: true,
    },
    products: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event", // exhibitor kis event me participate kar raha hai
      },
    ],
  },
  { timestamps: true }
);

const Exhibitor = mongoose.model("Exhibitor", exhibitorSchema);

export default Exhibitor;
