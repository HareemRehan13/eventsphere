import Registration from "../models/RegistrationModel.mjs";
import Attendee from "../models/AttendeeModel.mjs";
import Event from "../models/EventModel.mjs";

// Create/Register a new registration
const createRegistration = async (req, res) => {
  try {
    const { attendeeId, eventId } = req.body;

    // Check if attendee exists
    const attendee = await Attendee.findById(attendeeId);
    if (!attendee) return res.status(404).json({ message: "Attendee not found" });

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered
    const existing = await Registration.findOne({ attendee: attendeeId, event: eventId });
    if (existing) return res.status(400).json({ message: "Already registered for this event" });

    const registration = new Registration({
      attendee: attendeeId,
      event: eventId,
      status: "registered",
    });

    await registration.save();

    res.status(201).json({ message: "Registration successful", registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register attendee", error });
  }
};

// Get all registrations
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("attendee")
      .populate("event");
    res.status(200).json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching registrations", error });
  }
};

// Get registration by ID
const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate("attendee")
      .populate("event");
    if (!registration) return res.status(404).json({ message: "Registration not found" });
    res.status(200).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching registration", error });
  }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!registration) return res.status(404).json({ message: "Registration not found" });
    res.status(200).json({ message: "Registration cancelled", registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling registration", error });
  }
};

// Export all functions together
const registrationController = {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  cancelRegistration,
};

export default registrationController;
