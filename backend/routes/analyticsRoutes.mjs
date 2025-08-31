import express from "express";
import analyticsController from "../controllers/analyticsController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/attendee-engagement", auth, adminOnly, analyticsController.getAttendeeEngagement);
router.get("/booth-traffic", auth, adminOnly, analyticsController.getBoothTraffic);
router.get("/session-popularity", auth, adminOnly, analyticsController.getSessionPopularity);

export default router;
