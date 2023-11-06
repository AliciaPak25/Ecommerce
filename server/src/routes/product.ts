import { Router } from "express";
import { checkout, createProduct, getProducts } from "../controllers/product";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.post("/checkout", checkout);

export { router as productRouter };
