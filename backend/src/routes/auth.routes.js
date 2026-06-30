import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  verifyOtp,
  currentUser
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", protect, admin, getUsers);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, currentUser);

export default router;
