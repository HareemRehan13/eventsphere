import express from "express";
import boothController from "../controllers/BoothController.mjs";
import exhibitorController from "../controllers/ExhibitorController.mjs";
import { auth, requireRole } from "../src/middleware/auth.js";

const router = express.Router();

// CRUD routes for exhibitors
router.post("/", exhibitorController.createExhibitor);
router.get("/", exhibitorController.getExhibitors);
router.get("/:id", exhibitorController.getExhibitorById);
router.put("/:id", exhibitorController.updateExhibitor);
router.delete("/:id", exhibitorController.deleteExhibitor);

// Only exhibitors can create/view booths
router.post("/booths", auth, requireRole("exhibitor"), boothController.addBooth);
router.get("/booths", auth, requireRole("exhibitor"), boothController.getAllBooths);

export default router;
