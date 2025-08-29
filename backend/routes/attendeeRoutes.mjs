import express from "express";
import {
  createAttendee,
  getAttendees,
  getAttendeeById,
  updateAttendee,
  deleteAttendee
} from "../controllers/attendeeController.mjs";

const router = express.Router();

router.post("/", createAttendee);
router.get("/", getAttendees);
router.get("/:id", getAttendeeById);
router.put("/:id", updateAttendee);
router.delete("/:id", deleteAttendee);

export default router;
