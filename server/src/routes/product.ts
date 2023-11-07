import { Router } from "express";
import { checkout, createProduct, getProducts } from "../controllers/product";

const router = Router();

router.get("/", getProducts);
router.post("/create-product", createProduct); // create 18 or 20 products
router.post("/checkout", checkout);

export { router as productRouter };
