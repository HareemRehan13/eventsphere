import express from "express";
import userController from "../controllers/userController.mjs";
import { auth, requireRole } from "../src/middleware/auth.js";

const router = express.Router();

// -------------------- AUTH ROUTES --------------------

// Register a new user
router.post("/register", async (req, res) => {
  try {
    await userController.registerUser(req, res);
  } catch (error) {
    console.error("Route Register Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login user or admin
router.post("/login", async (req, res) => {
  try {
    await userController.loginUser(req, res);
  } catch (error) {
    console.error("Route Login Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Send email verification link
router.post("/send-email", async (req, res) => {
  try {
    await userController.sendEmail(req, res);
  } catch (error) {
    console.error("Route Send Email Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    await userController.sendOtp(req, res);
  } catch (error) {
    console.error("Route Send OTP Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    await userController.verifyOtp(req, res);
  } catch (error) {
    console.error("Route Verify OTP Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    await userController.forgotPassword(req, res);
  } catch (error) {
    console.error("Route Forgot Password Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ✅ Logout user
router.post("/logout", async (req, res) => {
  try {
    await userController.logoutUser(req, res);
  } catch (error) {
    console.error("Route Logout Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    await userController.resetPassword(req, res);
  } catch (error) {
    console.error("Route Reset Password Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------- USER MANAGEMENT --------------------

// Change activation status (admin only)
router.put("/status/:userId/:status", auth, requireRole("Admin"), async (req, res) => {
  try {
    await userController.changeActivationStatus(req, res);
  } catch (error) {
    console.error("Route Change Status Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------- EXPO VIEW --------------------

// View all expos (authenticated users only)
router.get("/expos", auth, async (req, res) => {
  try {
    await userController.viewExpos(req, res);
  } catch (error) {
    console.error("Route View Expos Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// View expos specific to logged-in user
router.get("/my-expos", auth, async (req, res) => {
  try {
    await userController.viewUserExpos(req, res);
  } catch (error) {
    console.error("Route View User Expos Error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
