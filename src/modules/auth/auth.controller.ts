import { type Request, type Response } from "express";
import {
  AuthServiceError,
  loginService,
  registersService,
} from "./auth.service.js";

export const registersController = async (req: Request, res: Response) => {
  try {
    // Step 1: Call Service
    const userData = await registersService(req.body);

    // Step 2: Send Success Response
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
      data: userData,
    });
  } catch (error) {
    // Step 3: Handle Known Errors
    if (error instanceof AuthServiceError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    // Step 4: Handle Unexpected Errors
    console.error("Registration Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const usersLogin = await loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "User Login Successfully!",
      data: usersLogin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
