import { Router } from "express";
import { body, validationResult } from "express-validator";
import Message from "../models/Message.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Send a message
router.post("/",
  auth,
  body("to").notEmpty(),
  body("body").notEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const msg = await Message.create({ from: req.user.sub, to: req.body.to, body: req.body.body, expo: req.body.expo || null });
  res.status(201).json(msg);
});

// Inbox
router.get("/inbox", auth, async (req, res) => {
  const msgs = await Message.find({ to: req.user.sub }).sort({ createdAt: -1 }).limit(100).populate("from", "name email");
  res.json(msgs);
});

// Sent
router.get("/sent", auth, async (req, res) => {
  const msgs = await Message.find({ from: req.user.sub }).sort({ createdAt: -1 }).limit(100).populate("to", "name email");
  res.json(msgs);
});

export default router;
