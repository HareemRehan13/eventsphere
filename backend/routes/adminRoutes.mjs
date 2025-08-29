import express from "express";
import { adminLogin, getAllUsers, deleteUser } from "../controllers/adminController.mjs";
import { auth, requireRole } from "../middleware/auth.mjs";

const router = express.Router();

// Admin login (yaha pe role check ki zaroorat nahi, sirf password match)
router.post("/login", adminLogin);

// Ye routes sirf admin k liye accessible hain
router.get("/users", auth, requireRole("admin"), getAllUsers);
router.delete("/users/:id", auth, requireRole("admin"), deleteUser);

export default router;
