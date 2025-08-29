// controllers/feedbackController.js
import Feedback from "../models/FeedbackModel.mjs";

// ✅ Create Feedback
 const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(400).json({ message: "Error submitting feedback", error: error.message });
  }
};

// ✅ Get All Feedback
 const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("attendeeId", "name email");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
};

// ✅ Get Feedback by ID
 const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate("attendeeId", "name email");
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
};

// ✅ Update Feedback
 const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    res.status(400).json({ message: "Error updating feedback", error: error.message });
  }
};

// ✅ Delete Feedback
 const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
};
const feedbackController = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
export default feedbackController;