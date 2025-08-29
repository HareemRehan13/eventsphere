import express from "express";
import {
  createBooth,
  getBooths,
  getBoothById,
  updateBooth,
  deleteBooth
} from "../controllers/boothController.mjs";

const router = express.Router();

router.post("/", createBooth);
router.get("/", getBooths);
router.get("/:id", getBoothById);
router.put("/:id", updateBooth);
router.delete("/:id", deleteBooth);

export default router;
