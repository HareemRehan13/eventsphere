import { Router } from "express";
import { body, validationResult } from "express-validator";
import Session from "../models/Session.js";
import Expo from "../models/Expo.js";
import Bookmark from "../models/Bookmark.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

// Create session (Organizer/Admin)
router.post("/",
  auth, requireRole("Organizer","Admin"),
  body("expo").notEmpty(),
  body("title").notEmpty(),
  body("startTime").isISO8601(),
  body("endTime").isISO8601(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const expo = await Expo.findById(req.body.expo);
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  if (req.user.role !== "Admin" && String(expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const session = await Session.create(req.body);
  res.status(201).json(session);
});

// List sessions by expo
router.get("/expo/:expoId", async (req, res) => {
  const sessions = await Session.find({ expo: req.params.expoId }).sort({ startTime: 1 });
  res.json(sessions);
});

// Update/Delete session
router.put("/:id", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const session = await Session.findById(req.params.id).populate("expo");
  if (!session) return res.status(404).json({ message: "Session not found" });
  if (req.user.role !== "Admin" && String(session.expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  Object.assign(session, req.body);
  await session.save();
  res.json(session);
});

router.delete("/:id", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const session = await Session.findById(req.params.id).populate("expo");
  if (!session) return res.status(404).json({ message: "Session not found" });
  if (req.user.role !== "Admin" && String(session.expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await session.deleteOne();
  res.json({ message: "Session deleted" });
});

// Attendee bookmarks
router.post("/:id/bookmark", auth, requireRole("Attendee"), async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ message: "Session not found" });
  const bookmark = await Bookmark.findOneAndUpdate(
    { user: req.user.sub, session: session._id },
    { $setOnInsert: { user: req.user.sub, session: session._id } },
    { upsert: true, new: true }
  );
  res.json({ message: "Bookmarked", bookmark });
});

router.delete("/:id/bookmark", auth, requireRole("Attendee"), async (req, res) => {
  await Bookmark.findOneAndDelete({ user: req.user.sub, session: req.params.id });
  res.json({ message: "Bookmark removed" });
});

export default router;
