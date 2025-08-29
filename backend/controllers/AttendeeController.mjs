import Attendee from "../models/AttendeeModel.mjs";

// Create attendee
const createAttendee = async (req, res) => {
  try {
    const newAttendee = new Attendee(req.body);
    const saved = await newAttendee.save();

    res.status(201).json({
      message: "Attendee registered successfully",
      attendee: saved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create attendee" });
  }
};

// Get all attendees
const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch attendees" });
  }
};

// Update attendee
const updateAttendee = async (req, res) => {
  try {
    const updated = await Attendee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Attendee not found" });

    res.status(200).json({ message: "Attendee updated", attendee: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update attendee" });
  }
};

// Delete attendee
const deleteAttendee = async (req, res) => {
  try {
    const deleted = await Attendee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Attendee not found" });

    res.status(200).json({ message: "Attendee deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete attendee" });
  }
};

const attendeeController = {
  createAttendee,
  getAllAttendees,
  updateAttendee,
  deleteAttendee,
};

export default attendeeController;
