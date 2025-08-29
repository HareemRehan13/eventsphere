import Exhibitor from "../models/ExhibitorModel.mjs";

export const getExhibitors = async (req, res) => {
  try {
    const exhibitors = await Exhibitor.find();
    res.status(200).json(exhibitors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibitors", error });
  }
};

export const createExhibitor = async (req, res) => {
  try {
    const exhibitor = new Exhibitor(req.body);
    await exhibitor.save();
    res.status(201).json(exhibitor);
  } catch (error) {
    res.status(500).json({ message: "Error creating exhibitor", error });
  }
};

export const getExhibitorById = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findById(req.params.id);
    if (!exhibitor) return res.status(404).json({ message: "Exhibitor not found" });
    res.json(exhibitor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibitor", error });
  }
};

export const updateExhibitor = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exhibitor);
  } catch (error) {
    res.status(500).json({ message: "Error updating exhibitor", error });
  }
};

export const deleteExhibitor = async (req, res) => {
  try {
    await Exhibitor.findByIdAndDelete(req.params.id);
    res.json({ message: "Exhibitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exhibitor", error });
  }
};
const exhibitorcontroller = {
  getExhibitors,
  createExhibitor,
  getExhibitorById,
  updateExhibitor,
  deleteExhibitor,
};
export default exhibitorcontroller;