import { Router } from "express";
import { body, validationResult } from "express-validator";
import Application from "../models/Application.js";
import Expo from "../models/Expo.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

// Exhibitor applies to expo
router.post("/",
  auth, requireRole("Exhibitor"),
  body("expo").notEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { expo, company, products, notes } = req.body;
  const exists = await Expo.findById(expo);
  if (!exists) return res.status(404).json({ message: "Expo not found" });

  const app = await Application.create({
    expo, exhibitor: req.user.sub, company, products, notes
  });
  res.status(201).json(app);
});

// Organizer views applications for their expo
router.get("/expo/:expoId", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const expo = await Expo.findById(req.params.expoId);
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  if (req.user.role !== "Admin" && String(expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const apps = await Application.find({ expo: expo._id }).populate("exhibitor", "name email company");
  res.json(apps);
});

// Approve/Reject
router.post("/:id/status", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const app = await Application.findById(req.params.id).populate("expo");
  if (!app) return res.status(404).json({ message: "Application not found" });
  if (req.user.role !== "Admin" && String(app.expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const { status } = req.body; // "Approved" or "Rejected"
  if (!["Approved","Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  app.status = status;
  await app.save();
  res.json(app);
});

export default router;
