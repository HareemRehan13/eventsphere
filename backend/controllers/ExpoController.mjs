// controllers/expoController.js
import Expo from "../models/Expo.mjs";
import Booth from "../models/boothModel.mjs";

// Create Expo
 const createExpo = async (req, res) => {
  try {
    const { name, description, startDate, endDate, venue, organizerName, organizerContact, totalBooths } = req.body;

    if (!name || !startDate || !endDate || !venue) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const expo = new Expo({
      name,
      description,
      startDate,
      endDate,
      venue,
      organizerName,
      organizerContact,
      totalBooths,
    });

    await expo.save();

    res.status(201).json({
      message: "Expo created successfully. Booths will be added after Admin approval.",
      expo,
    });
  } catch (error) {
    console.error("Error creating expo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Expos
export const getExpos = async (req, res) => {
  try {
    const expos = await Expo.find().populate("booths");
    res.status(200).json(expos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Request Booth (user side)
export const requestBooth = async (req, res) => {
  try {
    const { expoId, boothNumber, userId } = req.body;

    const expo = await Expo.findById(expoId);
    if (!expo) return res.status(404).json({ message: "Expo not found" });

    // Booth request create karega but status = pending
    const booth = new Booth({
      expo: expoId,
      boothNumber,
      requestedBy: userId,
      status: "pending", // admin approve/reject karega
    });

    await booth.save();
    expo.booths.push(booth._id);
    await expo.save();

    res.status(201).json({ message: "Booth request submitted. Awaiting Admin approval.", booth });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Approve Booth
export const approveBooth = async (req, res) => {
  try {
    const { boothId } = req.params;
    const booth = await Booth.findById(boothId);

    if (!booth) return res.status(404).json({ message: "Booth not found" });

    booth.status = "approved";
    await booth.save();

    res.status(200).json({ message: "Booth approved successfully", booth });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Reject Booth
export const rejectBooth = async (req, res) => {
  try {
    const { boothId } = req.params;
    const booth = await Booth.findById(boothId);

    if (!booth) return res.status(404).json({ message: "Booth not found" });

    booth.status = "rejected";
    await booth.save();

    res.status(200).json({ message: "Booth rejected", booth });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const expoController = {
createExpo,
rejectBooth,
getExpos,
requestBooth,
approveBooth,
}
export default expoController;
// User expo banata hai (expoController → createExpo).
// Exhibitor booth request karega (requestBooth).
// Booth ki status default pending rahegi.
// Admin panel se approve/reject kiya jaega (approveBooth ya rejectBooth).