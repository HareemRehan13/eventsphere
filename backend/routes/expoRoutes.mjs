import express from "express";
import expoController from "../controllers/ExpoController.mjs";

const router = express.Router();

// Get all expos
router.get("/", expoController.getExpos);

// Create a new expo
router.post("/", expoController.createExpo);

// Request a booth
router.post("/request-booth", expoController.requestBooth);

// Approve a booth
router.put("/approve-booth/:boothId", expoController.approveBooth);

// Reject a booth
router.put("/reject-booth/:boothId", expoController.rejectBooth);

export default router;
