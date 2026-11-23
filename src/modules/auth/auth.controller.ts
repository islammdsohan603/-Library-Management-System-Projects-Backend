import bcrypt from "bcryptjs";
import { type Request, type RequestHandler, type Response } from "express";

export const registers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
