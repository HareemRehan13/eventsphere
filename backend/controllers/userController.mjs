import User from "../models/userModel.mjs";
import Expo from "../models/Expo.mjs";
import Attendee from "../models/AttendeeModel.mjs";
import Exhibitor from "../models/ExhibitorModel.mjs";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// -------------------- SIGNUP --------------------
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, profilePicture, phone, companyName, boothNumber } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const userRole = role ? role.toLowerCase() : "attendee"; // default attendee

    if (userRole === "admin") {
      return res.status(403).json({ message: "Admin cannot signup via form" });
    }

    // ✅ hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create user first
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: userRole,
      profilePicture,
    });

    const savedUser = await newUser.save();

    // ✅ Create Attendee if role = attendee
    if (userRole === "attendee") {
      await Attendee.create({
        user: savedUser._id,
        name: username,
        email,
        phone,
        events: [], // optional, default empty
      });
    }

    // ✅ Create Exhibitor if role = exhibitor
    if (userRole === "exhibitor") {
      if (!companyName || !boothNumber) {
        return res.status(400).json({ message: "Company name and Booth number are required for Exhibitor" });
      }
      await Exhibitor.create({
        user: savedUser._id,
        companyName,
        boothNumber,
        products: [],
        events: [],
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    });

  } catch (error) {
    console.error("Register Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- LOGIN --------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const ADMIN_EMAIL = "admin@example.com";
    const ADMIN_PASSWORD = "SuperSecretAdmin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: "Admin" }, process.env.JWT_SECRET || "secret");
      return res.status(200).json({
        message: "Admin logged in successfully",
        user: { email, role: "Admin" },
        token,
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) return res.status(404).json({ message: "User not found" });

    // ✅ compare hashed password
    const match = await bcrypt.compare(password, checkUser.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const { password: pwd, otp, otpExpiry, ...userWithoutPassword } = checkUser._doc;

    const token = jwt.sign(
      { email: checkUser.email, _id: checkUser._id, role: checkUser.role },
      process.env.JWT_SECRET || "secret"
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
    console.error("Login Error:", error.message || error);
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message || error);
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
    console.error("Activation Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- EMAIL VERIFICATION --------------------
const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret");
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
    console.error("Send Email Error:", error.message || error);
    res.status(500).json({ message: "Failed to send verification email" });
  }
};

// -------------------- OTP --------------------
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

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
      html: `<p>Your OTP is: <b>${otp}</b></p><p>This OTP will expire in 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Send OTP Error:", error.message || error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (!user.otpExpiry || user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verify OTP Error:", error.message || error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

// -------------------- FORGOT PASSWORD --------------------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Sending reset email to:", user.email); // debug

    // Generate a raw token and hash it for storage
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Construct reset URL with raw token (sent in email)
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"HN Solutions" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
               <p>This link will expire in 15 minutes.</p>`,
      });
    } catch (emailErr) {
      console.error("Nodemailer Error:", emailErr);
      return res.status(500).json({ message: "Failed to send reset email. Check email credentials." });
    }

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- RESET PASSWORD --------------------
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) return res.status(400).json({ message: "Token and password required" });

    // Hash the token to match database
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // check token expiry
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err.message || err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

// -------------------- VIEW EXPOS --------------------
const viewExpos = async (req, res) => {
  try {
    const expos = await Expo.find();
    res.status(200).json({ expos });
  } catch (error) {
    console.error("View Expos Error:", error.message || error);
    res.status(500).json({ message: "Failed to fetch expos" });
  }
};

const viewUserExpos = async (req, res) => {
  try {
    const expos = await Expo.find({ attendees: req.user._id });
    res.status(200).json({ expos });
  } catch (error) {
    console.error("View User Expos Error:", error.message || error);
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
