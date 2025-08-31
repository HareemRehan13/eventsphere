import express from "express";
import boothController from "../controllers/BoothController.mjs";


const router = express.Router();

router.post("/",boothController.addBooth);
router.get("/", boothController.getAllBooths);
router.get("/:id",boothController.getBoothsByExpo);
router.put("/:id",boothController.updateBooth);
router.delete("/:id", boothController.deleteBooth);
router.delete("/:id", boothController.BoothIsBooked);

export default router;
