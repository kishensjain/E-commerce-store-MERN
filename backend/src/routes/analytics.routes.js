import express from "express";
import {getAdminStats} from "../controllers/analytics.controller.js";
import protect from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", protect, admin, getAdminStats);

export default router;
