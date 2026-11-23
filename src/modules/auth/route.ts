import { Router } from "express";
import { registers } from "./auth.controller.js";

const router = Router();
// post method 
router.post("/", registers);

export default router;
