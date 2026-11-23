import bcrypt from "bcryptjs";
import { type Request, type RequestHandler, type Response } from "express";

export const registersController: RequestHandler = async (req: Request, res: Response) => {
  try {
    
    return res.status(200).json({
      success:true,
      message:"User Registers Successfully!"
    })
   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
