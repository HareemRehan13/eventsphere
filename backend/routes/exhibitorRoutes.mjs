import express from "express";
import boothController from "../controllers/BoothController.mjs";
import exhibitorcontroller from "../controllers/ExhibitorController.mjs";
import { auth, requireRole } from "../src/middleware/auth.js";

// import requireRole from "../src/middleware/requireRole.mjs";

const router = express.Router();

// CRUD routes
router.post("/",exhibitorcontroller.createExhibitor);
router.get("/", exhibitorcontroller.getExhibitors);
router.get("/:id", exhibitorcontroller.getExhibitorById);
router.put("/:id", exhibitorcontroller.updateExhibitor);
router.delete("/:id",exhibitorcontroller. deleteExhibitor);

// Sirf exhibitor ko booth banane aur dekhne ki ijazat
router.post("/booths", auth, requireRole("exhibitor"), addBooth);
router.get("/booths", auth, requireRole("exhibitor"), getBooths);

export default router;
