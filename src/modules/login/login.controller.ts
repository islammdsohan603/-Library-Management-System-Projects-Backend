import { type Request, type Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal Error"
    })
  }
};
