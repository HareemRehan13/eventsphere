import Expo from "../models/Expo.js";
import Booth from "../models/Booth.js";
import Event from "../models/EventModel.mjs";
import Analytics from "../models/AnalyticsModel.mjs";

// 1️⃣ Attendee Engagement
export const getAttendeeEngagement = async (req, res) => {
  try {
    const expos = await Expo.find().populate("attendees");

    const engagement = [];

    for (let expo of expos) {
      engagement.push({
        expoId: expo._id,
        expoName: expo.name,
        totalAttendees: expo.attendees.length,
        attendees: expo.attendees.map(a => ({ id: a._id, name: a.username, email: a.email })),
      });

      // Save stats in Analytics
      await Analytics.create({
        expo: expo._id,
        attendeeCount: expo.attendees.length,
        date: new Date(),
      });
    }

    res.status(200).json(engagement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch attendee engagement" });
  }
};

// 2️⃣ Booth Traffic
export const getBoothTraffic = async (req, res) => {
  try {
    const booths = await Booth.find().populate("requestedBy").populate("expo");
    const traffic = [];

    for (let booth of booths) {
      let totalRequests = Array.isArray(booth.requestedBy) ? booth.requestedBy.length : (booth.requestedBy ? 1 : 0);

      traffic.push({
        boothId: booth._id,
        boothNumber: booth.boothNumber,
        expo: booth.expo?.name || "",
        status: booth.status,
        totalRequests,
        requestedBy: booth.requestedBy
          ? (Array.isArray(booth.requestedBy)
              ? booth.requestedBy.map(u => ({ id: u._id, name: u.username }))
              : { id: booth.requestedBy._id, name: booth.requestedBy.username })
          : null,
      });

      await Analytics.create({
        expo: booth.expo?._id,
        booth: booth._id,
        boothVisits: totalRequests,
        date: new Date(),
      });
    }

    res.status(200).json(traffic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch booth traffic" });
  }
};

// 3️⃣ Session Popularity
export const getSessionPopularity = async (req, res) => {
  try {
    const events = await Event.find().populate("attendees");
    const popularity = [];

    for (let ev of events) {
      popularity.push({
        eventId: ev._id,
        eventName: ev.title,
        attendeesCount: ev.attendees.length,
      });

      await Analytics.create({
        session: ev.title,
        sessionPopularity: ev.attendees.length,
        date: new Date(),
      });
    }

    res.status(200).json(popularity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch session popularity" });
  }
};

const analyticsController = {
  getAttendeeEngagement,
  getBoothTraffic,
  getSessionPopularity,
};

export default analyticsController;
