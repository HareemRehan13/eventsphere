import express from "express";
import venueController from "../controllers/Venuecontroller.mjs";

const router = express.Router();

router.post("/",venueController.createVenue);
router.get("/", venueController.getVenues);
router.get("/:id", venueController.getVenueById);
router.put("/:id", venueController.updateVenue);
router.delete("/:id", venueController.deleteVenue);

export default router;
