import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // -------------------- BASIC INFO --------------------
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["attendee", "exhibitor",  "admin"],
      default: "attendee",
    },

    // -------------------- ACCOUNT STATUS --------------------
    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // -------------------- OTP --------------------
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    // -------------------- FORGOT / RESET PASSWORD --------------------
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },

    // -------------------- ADDITIONAL FIELDS --------------------
    phone: {
      type: String,
      default: null,
    },

    companyName: {
      type: String,
      default: null,
    },

    boothNumber: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// -------------------- PASSWORD HASH --------------------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// -------------------- PASSWORD COMPARE --------------------
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// -------------------- EXPORT --------------------
const User = mongoose.model("User", userSchema);
export default User;
