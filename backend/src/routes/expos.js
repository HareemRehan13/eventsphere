import { Router } from "express";
import { body, validationResult } from "express-validator";
import Expo from "../models/Expo.js";
import Booth from "../models/Booth.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

// Create expo (Organizer/Admin)
router.post("/",
  auth, requireRole("Organizer","Admin"),
  body("title").notEmpty(),
  body("dateStart").isISO8601(),
  body("dateEnd").isISO8601(),
  body("location").notEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const expo = await Expo.create({ ...req.body, organizer: req.user.sub });
  res.status(201).json(expo);
});

// List expos
router.get("/", async (_req, res) => {
  const expos = await Expo.find().populate("organizer", "name email role").sort({ createdAt: -1 });
  res.json(expos);
});

// Get one expo
router.get("/:id", async (req, res) => {
  const expo = await Expo.findById(req.params.id).populate("organizer", "name email");
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  res.json(expo);
});

// Update expo
router.put("/:id", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const expo = await Expo.findById(req.params.id);
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  if (req.user.role !== "Admin" && String(expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  Object.assign(expo, req.body);
  await expo.save();
  res.json(expo);
});

// Delete expo
router.delete("/:id", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const expo = await Expo.findById(req.params.id);
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  if (req.user.role !== "Admin" && String(expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await expo.deleteOne();
  res.json({ message: "Expo deleted" });
});

// Create booth for expo
router.post("/:id/booths",
  auth, requireRole("Organizer","Admin"),
  body("boothName").notEmpty(),
async (req, res) => {
  const expo = await Expo.findById(req.params.id);
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  if (req.user.role !== "Admin" && String(expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const booth = await Booth.create({ expo: expo._id, boothName: req.body.boothName, size: req.body.size, price: req.body.price });
  res.status(201).json(booth);
});

// List booths for expo
router.get("/:id/booths", async (req, res) => {
  const booths = await (await Booth.find({ expo: req.params.id })).map(b => b);
  res.json(booths);
});

export default router;
