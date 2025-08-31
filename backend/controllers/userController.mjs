import User from "../models/userModel.mjs";
import Expo from "../models/Expo.mjs";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// -------------------- SIGNUP --------------------
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, profilePicture } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const userRole = role || "User";

    if (userRole === "Admin") {
      return res.status(403).json({ message: "Admin cannot signup via form" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: userRole,
      profilePicture,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- LOGIN --------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ADMIN_EMAIL = "admin@example.com";
    const ADMIN_PASSWORD = "SuperSecretAdmin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: "Admin" }, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "Admin logged in successfully",
        user: { email, role: "Admin" },
        token,
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) return res.status(404).json({ message: "User not found" });

    const match = await checkUser.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const { password: pwd, otp, otpExpiry, ...userWithoutPassword } = checkUser._doc;

    const token = jwt.sign(
      { email: checkUser.email, _id: checkUser._id, role: checkUser.role },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: userWithoutPassword,
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- AUTH --------------------
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
    res.status(401).json({ msg: "Invalid token" });
  }
};

// -------------------- ACTIVATE / DEACTIVATE --------------------
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

// -------------------- EMAIL VERIFICATION --------------------
const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const verifyLink = `http://localhost:5000/api/user/verify?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Verify Email" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account",
      html: `
        <div>
          <h2>Verify Your Account</h2>
          <p>Please verify your account by clicking the button below:</p>
          <a href="${verifyLink}">Verify My Account</a>
        </div>
      `,
    });

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send verification email" });
  }
};

// -------------------- OTP --------------------
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date(Date.now() + 1 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
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

// -------------------- FORGOT PASSWORD --------------------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------- RESET PASSWORD --------------------
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------- VIEW EXPOS --------------------
const viewExpos = async (req, res) => {
  try {
    const expos = await Expo.find();
    res.status(200).json({ expos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch expos" });
  }
};

const viewUserExpos = async (req, res) => {
  try {
    const expos = await Expo.find({ attendees: req.user._id });
    res.status(200).json({ expos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user's expos" });
  }
};

// -------------------- EXPORT --------------------
const userController = {
  registerUser,
  loginUser,
  auth,
  changeActivationStatus,
  sendEmail,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  viewExpos,
  viewUserExpos,
};

export default userController;
