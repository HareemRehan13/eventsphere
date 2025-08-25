import { Router } from "express";
import { auth, requireRole } from "../middleware/auth.js";
import Expo from "../models/Expo.js";
import Booth from "../models/Booth.js";
import Session from "../models/Session.js";
import Application from "../models/Application.js";
import Bookmark from "../models/Bookmark.js";

const router = Router();

router.get("/expo/:expoId", auth, requireRole("Organizer","Admin"), async (req, res) => {
  const expo = await Expo.findById(req.params.expoId);
  if (!expo) return res.status(404).json({ message: "Expo not found" });
  if (req.user.role !== "Admin" && String(expo.organizer) !== req.user.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const [boothsTotal, boothsBooked, sessions, appsPending, appsApproved, bookmarks] = await Promise.all([
    Booth.countDocuments({ expo: expo._id }),
    Booth.countDocuments({ expo: expo._id, bookedBy: { $ne: null } }),
    Session.countDocuments({ expo: expo._id }),
    Application.countDocuments({ expo: expo._id, status: "Pending" }),
    Application.countDocuments({ expo: expo._id, status: "Approved" }),
    Bookmark.countDocuments({})
  ]);

  res.json({
    booths: { total: boothsTotal, booked: boothsBooked, occupancy: boothsTotal ? Math.round(100*boothsBooked/boothsTotal) : 0 },
    sessions,
    applications: { pending: appsPending, approved: appsApproved },
    bookmarks
  });
});

export default router;
