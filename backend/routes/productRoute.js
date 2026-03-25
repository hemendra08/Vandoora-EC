import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/new").post(createProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
