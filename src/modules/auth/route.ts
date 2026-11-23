import { Router } from "express";
import { registersController } from "./auth.controller.js";
 

const router = Router();
// post method 
router.post("/", registersController);

export default router;
