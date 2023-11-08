import { Router } from "express";
import { availableMoney, login, register } from "../controllers/user";
import { validateLoginData, validateUserData } from "../utils/validation";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.post("/register", validateUserData, register);
router.post("/login", validateLoginData, login);
router.get("/available-money/:userID", verifyToken, availableMoney);

export { router as userRouter };
