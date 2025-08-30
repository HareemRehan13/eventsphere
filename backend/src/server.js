import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRoutes from "../routes/adminRoutes.mjs";
import attendeeRoutes from "../routes/attendeeRoutes.mjs";
import boothRoutes from "../routes/boothRoutes.mjs";
import eventRoutes from "../routes/eventRoutes.mjs";
import exhibitorRoutes from "../routes/exhibitorRoutes.mjs";
import expoRoutes from "../routes/expoRoutes.mjs";
import feedbackRoutes from "../routes/feedbackRoutes.mjs";
import notificationRoutes from "../routes/notificationRoutes.mjs";
import scheduleRoutes from "../routes/scheduleRoutes.mjs";
import ticketRoutes from "../routes/ticketRoutes.mjs";
import userRoutes from "../routes/userRoutes.mjs";
import venueRoutes from "../routes/venueRoutes.mjs";
import routes from "../routes/routes.mjs";
// import authRoutes from "./routes/auth.js";
// import expoRoutes from "./routes/expos.js";
// import boothRoutes from "./routes/booths.js";
// import appRoutes from "./routes/applications.js";
// import sessionRoutes from "./routes/sessions.js";
// import messageRoutes from "./routes/messages.js";
// import searchRoutes from "./routes/search.js";
// import analyticsRoutes from "./routes/analytics.js";
// import sseRoutes from "./routes/sse.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ status: "ok", name: "EventSphere API" }));

app.use("/api/admin", adminRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/booths", boothRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/exhibitors", exhibitorRoutes);
app.use("/api/expos", expoRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api", routes); // general or default routes
// routes

// app.use("/api/auth", authRoutes);
// app.use("/api/expos", expoRoutes);
// app.use("/api/booths", boothRoutes);
// app.use("/api/applications", appRoutes);
// app.use("/api/sessions", sessionRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/search", searchRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/rt", sseRoutes);

//  // agar koi general routes ho
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  });
