const express = require("express");
const router = express.Router();
const ExpoController = require("../controllers/expoController");

// Get all expos
router.get("/", ExpoController.getAllExpos);

// Create a new expo
router.post("/", ExpoController.createExpo);

// Get a single expo by ID
router.get("/:expoId", ExpoController.getExpoById);

// Update an expo by ID
router.put("/:expoId", ExpoController.updateExpo);

// Delete an expo by ID
router.delete("/:expoId", ExpoController.deleteExpo);

module.exports = router;
