import User from "../models/userModel.mjs";
import Expo from "../models/ExpoModel.mjs"; // ✅ Expo model import
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
const registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // 🔑 hash model karega
      profilePicture: req.body.profilePicture,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({ message: "User registration failed" });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    let checkUser = await User.findOne({ email: req.body.email });

    if (!checkUser) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const match = await checkUser.comparePassword(req.body.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: checkUser.email,
        _id: checkUser._id,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const { password, otp, otpExpiry, ...userWithoutPassword } = checkUser._doc;

    res
      .cookie("token", token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: userWithoutPassword,
        token: token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// Activate/Deactivate user
const changeActivationStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentStatus = req.params.status === "true";
    const newStatus = !currentStatus;

    const toggleStatus = await User.updateOne({ _id: userId }, { $set: { isActive: newStatus } });

    if (toggleStatus.modifiedCount === 1) {
      res.status(200).json({ message: "User status updated successfully" });
    } else {
      res.status(404).json({ message: "Failed to update user status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Send verification email
const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const verifyLink = `http://localhost:5000/api/user/verify?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const sendMailStatus = await transporter.sendMail({
      from: `"Verify Email" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 5px;">
          <h2 style="color: #007BFF;">Verify Your Account</h2>
          <p>Thanks for registering! Please verify your account by clicking the button below:</p>
          <a href="${verifyLink}" style="display: inline-block; padding: 10px 20px; background: #007BFF; color: white; text-decoration: none; border-radius: 4px;">Verify My Account</a>
          <p>If you did not register, please ignore this email.</p>
        </div>
      `,
    });

    if (sendMailStatus.accepted) {
      res.status(200).json({ message: "Verification email sent successfully" });
    } else {
      res.status(400).json({ message: "Email sending failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send verification email" });
  }
};

// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date(Date.now() + 1 * 60 * 1000); // 1 min

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HN Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is: <b>${otp}</b></p><p>This code will expire in 1 minute.</p>`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

// ✅ View all expos
const viewExpos = async (req, res) => {
  try {
    const expos = await Expo.find();
    res.status(200).json({ expos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch expos" });
  }
};

// ✅ View user-specific expos (attended/registered)
const viewUserExpos = async (req, res) => {
  try {
    const expos = await Expo.find({ attendees: req.user._id });
    res.status(200).json({ expos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user's expos" });
  }
};

const userController = {
  registerUser,
  loginUser,
  changeActivationStatus,
  sendEmail,
  sendOtp,
  verifyOtp,
  auth,
  viewExpos,       // ✅ added
  viewUserExpos,   // ✅ added
};

export default userController;
