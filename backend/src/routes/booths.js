import { Router } from "express";
import Booth from "../models/Booth.js";
import Expo from "../models/Expo.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

// Exhibitor reserves a booth (if not taken)
router.post("/:boothId/reserve", auth, requireRole("Exhibitor"), async (req, res) => {
  const booth = await Booth.findById(req.params.boothId).populate("expo");
  if (!booth) return res.status(404).json({ message: "Booth not found" });
  if (booth.bookedBy) return res.status(400).json({ message: "Already reserved" });
  booth.bookedBy = req.user.sub;
  await booth.save();
  res.json({ message: "Booth reserved", booth });
});

// Organizer clears / assigns booth
router.post("/:boothId/assign/:userId", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const booth = await Booth.findById(req.params.boothId).populate("expo");
  if (!booth) return res.status(404).json({ message: "Booth not found" });
  // Verify ownership
  if (req.user.role !== "Admin" && String(booth.expo.organizer) != req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  booth.bookedBy = req.params.userId;
  await booth.save();
  res.json({ message: "Booth assigned", booth });
});

router.post("/:boothId/release", auth, requireRole("Organizer","Admin","Exhibitor"), async (req, res) => {
  const booth = await Booth.findById(req.params.boothId).populate("expo");
  if (!booth) return res.status(404).json({ message: "Booth not found" });
  if (req.user.role === "Exhibitor" && String(booth.bookedBy) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  // If organizer, verify ownership
  if (req.user.role === "Organizer" && String(booth.expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  booth.bookedBy = null;
  await booth.save();
  res.json({ message: "Booth released", booth });
});

export default router;
