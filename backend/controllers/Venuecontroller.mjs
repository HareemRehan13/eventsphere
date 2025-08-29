import Venue from "../models/VenueModel.mjs";

// Add a new venue
const createVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json({ message: "Venue created successfully", venue });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all venues
const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single venue by ID
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update venue
const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json({ message: "Venue updated successfully", venue });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete venue
const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions as a single object
const venueController = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};

export default venueController;
