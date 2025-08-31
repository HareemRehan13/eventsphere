import express from "express";
import ticketController from "../controllers/TicketController.mjs";

const router = express.Router();

router.post("/",ticketController.createTicket);
router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

export default router;
