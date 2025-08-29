import express from "express";
import {
  createExhibitor,
  getExhibitors,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor
} from "../controllers/exhibitorController.mjs";

const router = express.Router();

router.post("/", createExhibitor);
router.get("/", getExhibitors);
router.get("/:id", getExhibitorById);
router.put("/:id", updateExhibitor);
router.delete("/:id", deleteExhibitor);

export default router;
