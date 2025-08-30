import express from "express";
import {
  createExhibitor,
  getExhibitors,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor,
  createBooth,
  getBooths
} from "../controllers/exhibitorController.mjs";
import { auth, requireRole } from "../src/middleware/auth.js";

// import requireRole from "../src/middleware/requireRole.mjs";

const router = express.Router();

// CRUD routes
router.post("/", createExhibitor);
router.get("/", getExhibitors);
router.get("/:id", getExhibitorById);
router.put("/:id", updateExhibitor);
router.delete("/:id", deleteExhibitor);

// Sirf exhibitor ko booth banane aur dekhne ki ijazat
router.post("/booths", auth, requireRole("exhibitor"), createBooth);
router.get("/booths", auth, requireRole("exhibitor"), getBooths);

export default router;
