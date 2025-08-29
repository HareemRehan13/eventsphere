import express from "express";
import { adminLogin } from "../controllers/adminController.mjs";

const router = express.Router();

// POST /api/admin/login
router.post("/login", adminLogin);

export default router;
