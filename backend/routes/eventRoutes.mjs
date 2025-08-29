import express from "express";
import EventController from "../controllers/EventController.mjs";

const router = express.Router();

// Get all events
router.get("/", EventController.getEvents);

// Create a new event
router.post("/", EventController.createEvent);

// Get a single event by ID
router.get("/:id", EventController.getEventById);

// Update an event by ID
router.put("/:id", EventController.updateEvent);

// Delete an event by ID
router.delete("/:id", EventController.deleteEvent);

export default router;
