import express from "express";
import feedbackController from "../controllers/feedbackController.mjs";

const router = express.Router();

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getAllFeedback);
router.get("/:id",feedbackController. getFeedbackById);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

export default router;
