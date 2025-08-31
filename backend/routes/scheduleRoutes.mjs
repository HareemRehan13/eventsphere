import express from "express";
import scheduleController from "../controllers/scheduleController.mjs";

const router = express.Router();

router.post("/",scheduleController.createSchedule);
router.get("/", scheduleController.getSchedules);
router.get("/:id", scheduleController.getScheduleById);
router.put("/:id", scheduleController.updateSchedule);
router.delete("/:id", scheduleController.deleteSchedule);

export default router;
