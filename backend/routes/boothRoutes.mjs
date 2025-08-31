import express from "express";
import boothController from "../controllers/BoothController.mjs";

const router = express.Router();

router.post("/", boothController.addBooth);
router.get("/", boothController.getAllBooths);
router.get("/expo/:expoId", boothController.getBoothsByExpo);
router.put("/:boothId", boothController.updateBooth);
router.delete("/:boothId", boothController.deleteBooth);
router.post("/:boothId/book", boothController.bookBooth);
router.post("/:boothId/approve", boothController.approveBooth);

export default router;
