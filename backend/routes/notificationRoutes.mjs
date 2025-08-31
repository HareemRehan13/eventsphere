import express from "express";
import notificationcontroller from "../controllers/notificationController.mjs";

const router = express.Router();

router.post("/", notificationcontroller.createNotification);
router.get("/", notificationcontroller.getAllNotifications);
router.get("/:id",notificationcontroller.getNotificationById);
router.put("/:id", notificationcontroller.updateNotification);
router.delete("/:id", notificationcontroller.deleteNotification);
router.delete("/:id", notificationcontroller.sendNotification);

export default router;
