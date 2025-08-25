import { Router } from "express";
import User from "../models/User.js";
import Booth from "../models/Booth.js";
import Expo from "../models/Expo.js";

const router = Router();

// Simple exhibitor search
router.get("/exhibitors", async (req, res) => {
  const q = (req.query.q || "").trim();
  const filter = { role: "Exhibitor" };
  if (q) {
    filter.$or = [
      { name: new RegExp(q, "i") },
      { company: new RegExp(q, "i") },
      { bio: new RegExp(q, "i") }
    ];
  }
  const list = await User.find(filter).select("name email company bio");
  res.json(list);
});

// Public expo listing / filter by date or location
router.get("/expos", async (req, res) => {
  const { location } = req.query;
  const filter = {};
  if (location) filter.location = new RegExp(location, "i");
  const list = await Expo.find(filter).sort({ dateStart: 1 });
  res.json(list);
});

// Booth availability quick view
router.get("/expo/:id/booths", async (req, res) => {
  const booths = await Booth.find({ expo: req.params.id }).select("boothName price bookedBy");
  res.json(booths.map(b => ({ id: b._id, boothName: b.boothName, price: b.price, available: !b.bookedBy })));
});

export default router;
