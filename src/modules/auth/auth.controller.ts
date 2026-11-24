import { type RequestHandler } from "express";
import { AuthServiceError, registersService } from "./auth.service.js";

export const registersController: RequestHandler = async (req, res) => {
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
