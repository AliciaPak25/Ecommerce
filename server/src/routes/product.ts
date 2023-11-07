import { Router } from "express";
import {
  checkout,
  createProduct,
  getProducts,
  purchasedItemsOfACustomer,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { verifyToken } from "./user";

const router = Router();

router.get("/", getProducts);
router.post("/create-product", createProduct); // create 18 or 20 products
router.patch("/update-product/:productID", updateProduct);
router.delete("/delete-product/:productID", deleteProduct);
router.post("/checkout", checkout);
router.get(
  "/purchased-items/:customerID",
  verifyToken,
  purchasedItemsOfACustomer
);

export { router as productRouter };
