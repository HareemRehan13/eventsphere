import mongoose from "mongoose";
import Booth from "../models/boothModel.mjs";
import Expo from "../models/Expo.mjs";

// ✅ Admin creates a booth
const addBooth = async (req, res) => {
  const { boothNumber, expoId, floor } = req.body;

  if (!boothNumber || boothNumber.trim() === '') {
    return res.status(400).json({ message: "Booth number is required" });
  }
  if (!expoId || !mongoose.Types.ObjectId.isValid(expoId)) {
    return res.status(400).json({ message: "Valid expo ID is required" });
  }
  if (!floor || floor.trim() === '') {
    return res.status(400).json({ message: "Floor is required" });
  }

  try {
    const boothExists = await Booth.findOne({ boothNumber, expoId });
    if (boothExists) {
      return res.status(400).json({ message: `Booth number ${boothNumber} already exists for this expo.` });
    }

    const expo = await Expo.findById(expoId);
    if (!expo) return res.status(404).json({ message: "Expo not found" });

    const newBooth = await Booth.create({ boothNumber, expoId, floor, status: "available" });

    expo.booths.push(newBooth._id);
    await expo.save();

    return res.status(201).json({ message: "Booth created successfully", booth: newBooth });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding booth", error: error.message });
  }
};

// ✅ User books a booth
const bookBooth = async (req, res) => {
  const { boothId } = req.params;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(boothId)) return res.status(400).json({ message: "Invalid booth ID" });

  try {
    const booth = await Booth.findById(boothId);
    if (!booth) return res.status(404).json({ message: "Booth not found" });
    if (booth.status !== "available") return res.status(400).json({ message: "Booth not available" });

    booth.status = "pending";
    booth.bookedBy = userId;
    await booth.save();

    return res.status(200).json({ message: "Booking request submitted", booth });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error booking booth", error: error.message });
  }
};

// ✅ Admin approves a booth
const approveBooth = async (req, res) => {
  const { boothId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(boothId)) return res.status(400).json({ message: "Invalid booth ID" });

  try {
    const booth = await Booth.findById(boothId);
    if (!booth) return res.status(404).json({ message: "Booth not found" });
    if (booth.status !== "pending") return res.status(400).json({ message: "Booth not pending approval" });

    booth.status = "approved";
    await booth.save();

    return res.status(200).json({ message: "Booth approved successfully", booth });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error approving booth", error: error.message });
  }
};

// ✅ Get all booths
const getAllBooths = async (req, res) => {
  try {
    const booths = await Booth.find().populate("expoId", "name venue startDate endDate");
    return res.status(200).json(booths);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching booths", error: error.message });
  }
};

// ✅ Get booths by expo
const getBoothsByExpo = async (req, res) => {
  const { expoId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(expoId)) return res.status(400).json({ message: "Invalid expo ID" });

  try {
    const booths = await Booth.find({ expoId });
    if (booths.length === 0) return res.status(404).json({ message: "No booths found" });
    return res.status(200).json(booths);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching booths", error: error.message });
  }
};

// ✅ Update a booth
const updateBooth = async (req, res) => {
  const { boothId } = req.params;
  const { boothNumber } = req.body;
  if (!mongoose.Types.ObjectId.isValid(boothId)) return res.status(400).json({ message: "Invalid booth ID" });

  try {
    const booth = await Booth.findById(boothId);
    if (!booth) return res.status(404).json({ message: "Booth not found" });

    if (boothNumber) {
      const duplicate = await Booth.findOne({ boothNumber, expoId: booth.expoId, _id: { $ne: boothId } });
      if (duplicate) return res.status(400).json({ message: "Booth number already exists" });
      booth.boothNumber = boothNumber;
    }

    await booth.save();
    return res.status(200).json({ message: "Booth updated successfully", booth });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating booth", error: error.message });
  }
};

// ✅ Delete a booth
const deleteBooth = async (req, res) => {
  const { boothId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(boothId)) return res.status(400).json({ message: "Invalid booth ID" });

  try {
    const booth = await Booth.findByIdAndDelete(boothId);
    if (!booth) return res.status(404).json({ message: "Booth not found" });

    await Expo.findByIdAndUpdate(booth.expoId, { $pull: { booths: boothId } });
    return res.status(200).json({ message: "Booth deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting booth", error: error.message });
  }
};

// ✅ Export all controllers together
const boothController = {
  addBooth,
  bookBooth,
  approveBooth,
  getAllBooths,
  getBoothsByExpo,
  updateBooth,
  deleteBooth,
};

export default boothController;
