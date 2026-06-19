import express from "express";
import {
  placeOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderById,
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.route("/").post(protect, placeOrder).get(protect, admin, getOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/cancel").put(protect, cancelOrder);

export default router;
