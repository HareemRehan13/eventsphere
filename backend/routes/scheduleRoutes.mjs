import express from "express";
import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
} from "../controllers/scheduleController.mjs";

const router = express.Router();

router.post("/", createSchedule);
router.get("/", getSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;
