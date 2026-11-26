import { Router } from "express";
import { loginController, registersController } from "./auth.controller.js";

const router = Router();
// post method
router.post("/register", registersController);
router.post("/login", loginController);
export default router;
