// NotificationController.js
import Notification from "../models/NotificationModel.mjs"; // apna notification model import karo

// ✅ Create Notification
 const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ message: "Notification created", notification });
  } catch (error) {
    res.status(400).json({ message: "Error creating notification", error });
  }
};

// ✅ Get All Notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// ✅ Get Notification by ID
 const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notification", error });
  }
};

// ✅ Update Notification
 const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification updated", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};

// ✅ Delete Notification
 const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

// ✅ Send Notification (custom logic - email ya push notification)
 const sendNotification = async (req, res) => {
  try {
    // Example: yahan tum email / push notification logic likh sakte ho
    const { title, message, recipients } = req.body;

    // Placeholder response (baad mai email/push service connect karna)
    res.status(200).json({
      message: "Notification sent successfully",
      data: { title, message, recipients },
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error });
  }
};
const notificationcontroller = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
   deleteNotification, 
   sendNotification, 
};
export default notificationcontroller;