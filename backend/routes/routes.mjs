import express from 'express';
import eventController from '../controllers/EventController.mjs';
import attendeeController from '../controllers/AttendeeController.mjs';
import exhibitorController from '../controllers/ExhibitorController.mjs';
import feedbackController from '../controllers/feedbackController.mjs';
import notificationController from '../controllers/notificationController.mjs';
import scheduleController from '../controllers/scheduleController.mjs';
import ticketController from '../controllers/TicketController.mjs';
import venueController from '../controllers/Venuecontroller.mjs';
import userController from '../controllers/userController.mjs';

const router = express.Router();

/** ---------------- User Routes ---------------- */
router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);
router.post("/user/send-otp", userController.sendOtp);
router.post("/user/verify-otp", userController.verifyOtp);
router.post("/user/send-verification-email", userController.sendEmail);
router.get("/user/send-verification-email", userController.sendEmail);
router.patch("/user/deactivateUser/:userId/:status", userController.auth, userController.changeActivationStatus);
router.patch("/user/activateUser/:userId/:status", userController.auth, userController.changeActivationStatus);

/** ---------------- Event Routes ---------------- */
router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEventById);
router.post("/event", userController.auth, eventController.createEvent);
router.put("/event/:id", userController.auth, eventController.updateEvent);
router.delete("/event/:id", userController.auth, eventController.deleteEvent);

/** ---------------- Attendee Routes ---------------- */
router.get("/attendees", attendeeController.getAllAttendees);
// router.get("/attendee/:id", attendeeController.getAttendeeById);
router.post("/attendee", userController.auth, attendeeController.createAttendee);
router.put("/attendee/:id", userController.auth, attendeeController.updateAttendee);
router.delete("/attendee/:id", userController.auth, attendeeController.deleteAttendee);

/** ---------------- Exhibitor Routes ---------------- */
router.get("/exhibitors", exhibitorController.getExhibitors);
router.get("/exhibitor/:id", exhibitorController.getExhibitorById);
router.post("/exhibitor", userController.auth, exhibitorController.createExhibitor);
router.put("/exhibitor/:id", userController.auth, exhibitorController.updateExhibitor);
router.delete("/exhibitor/:id", userController.auth, exhibitorController.deleteExhibitor);

/** ---------------- Feedback Routes ---------------- */
router.get("/feedbacks", feedbackController.getAllFeedback);
router.get("/feedback/:id", feedbackController.getFeedbackById);
router.post("/feedback", userController.auth, feedbackController.createFeedback);
router.put("/feedback/:id", userController.auth, feedbackController.updateFeedback);
router.delete("/feedback/:id", userController.auth, feedbackController.deleteFeedback);

/** ---------------- Notification Routes ---------------- */
router.get("/notifications", notificationController.getAllNotifications);
router.get("/notification/:id", notificationController.getNotificationById);
router.post("/notification", userController.auth, notificationController.createNotification);
router.put("/notification/:id", userController.auth, notificationController.updateNotification);
router.delete("/notification/:id", userController.auth, notificationController.deleteNotification);

/** ---------------- Schedule Routes ---------------- */
router.get("/schedules", scheduleController.getSchedules);
router.get("/schedule/:id", scheduleController.getScheduleById);
router.post("/schedule", userController.auth, scheduleController.createSchedule);
router.put("/schedule/:id", userController.auth, scheduleController.updateSchedule);
router.delete("/schedule/:id", userController.auth, scheduleController.deleteSchedule);

/** ---------------- Ticket Routes ---------------- */
router.get("/tickets", ticketController.getTickets);
router.get("/ticket/:id", ticketController.getTicketById);
router.post("/ticket", userController.auth, ticketController.createTicket);
router.put("/ticket/:id", userController.auth, ticketController.updateTicket);
router.delete("/ticket/:id", userController.auth, ticketController.deleteTicket);

/** ---------------- Venue Routes ---------------- */
router.get("/venues", venueController.getVenues);
router.get("/venue/:id", venueController.getVenueById);
router.post("/venue", userController.auth, venueController.createVenue);
router.put("/venue/:id", userController.auth, venueController.updateVenue);
router.delete("/venue/:id", userController.auth, venueController.deleteVenue);

export default router;
