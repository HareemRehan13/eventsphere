import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  viewExpos
} from "../controllers/userController.mjs";
import auth from "../middleware/auth.mjs";
import requireRole from "../middleware/requireRole.mjs";

const router = express.Router();

// CRUD routes
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Sirf "user" role wale expos dekh sakte hain
router.get("/expos", auth, requireRole("user"), viewExpos);

export default router;
