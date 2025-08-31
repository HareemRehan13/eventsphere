const express = require("express");
const router = express.Router();
import expoController from "../controllers/expoController";

// Get all expos
router.get("/", expoController.createExpo);

// Create a new expo
router.post("/", expoController.updateExpo);

// Get a single expo by ID
router.get("/:expoId", expoController.getAllExpos);

// Update an expo by ID
router.put("/:expoId", expoController.getExpoById);

// Delete an expo by ID
router.delete("/:expoId", expoController.deleteExpo);

module.exports = router;
