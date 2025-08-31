import express from "express";
import userController from "../controllers/userController.mjs";
import { auth, requireRole } from "../src/middleware/auth.js";

const router = express.Router();

// -------------------- AUTH ROUTES --------------------

// Register a new user
router.post("/register", userController.registerUser);

// Login user or admin
router.post("/login", userController.loginUser);

// Send email verification link
router.post("/send-email", userController.sendEmail);

// Send OTP
router.post("/send-otp", userController.sendOtp);

// Verify OTP
router.post("/verify-otp", userController.verifyOtp);

// Forgot password
router.post("/forgot-password", userController.forgotPassword);

// Reset password
router.post("/reset-password/:token", userController.resetPassword);

// -------------------- USER MANAGEMENT --------------------

// Change activation status (admin only)
router.put("/status/:userId/:status", auth, requireRole("Admin"), userController.changeActivationStatus);

// -------------------- EXPO VIEW --------------------

// View all expos (authenticated users only)
router.get("/expos", auth, userController.viewExpos);

// View expos specific to logged-in user
router.get("/my-expos", auth, userController.viewUserExpos);

export default router;
