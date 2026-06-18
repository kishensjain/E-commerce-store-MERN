import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import multer from "multer";
import validateObjectId from "../middlewares/validateObjectId.middleware.js";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);

router
  .route("/:id")
  .get(validateObjectId, getProductById)
  .put(protect, admin, validateObjectId, upload.single("image"), updateProduct)
  .delete(protect, admin, validateObjectId, deleteProduct);

export default router;
