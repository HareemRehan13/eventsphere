import Schedule from "../models/SheduleModel.mjs";

// Create a new schedule
const createSchedule = async (req, res) => {
  try {
    const { event, title, description, speaker, startTime, endTime, location } = req.body;

    const schedule = new Schedule({
      event,
      title,
      description,
      speaker,
      startTime,
      endTime,
      location,
    });

    await schedule.save();
    res.status(201).json({ message: "Schedule created successfully", schedule });
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error: error.message });
  }
};

// Get all schedules
const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("event").populate("speaker");
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error: error.message });
  }
};

// Get schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate("event").populate("speaker");
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule", error: error.message });
  }
};

// Update schedule
const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json({ message: "Schedule updated successfully", schedule });
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error: error.message });
  }
};

// Delete schedule
const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting schedule", error: error.message });
  }
};

const scheduleController = {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
export default scheduleController;
