import express from "express";
import attendeeController from "../controllers/AttendeeController.mjs";

const router = express.Router();

router.post("/", attendeeController.createAttendee);
router.get("/", attendeeController.getAllAttendees);
// router.get("/:id", attendeeController.getAttendeeById);
router.put("/:id", attendeeController.updateAttendee);
router.delete("/:id", attendeeController.deleteAttendee);

export default router;
