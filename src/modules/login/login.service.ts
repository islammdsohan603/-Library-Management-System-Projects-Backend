import { pool } from "../../db/dataBase.js";
import type { UserRigister } from "../auth/auth.interface.js";

const JWTSECRET = process.env.JWT_SECRET;

if(!JWTSECRET){
    throw new Error("JW SECRET NOT FOUND!")
}

export const loginService=async(payload:UserRigister)=>{

    const {email,password}=payload;

    const result=await pool.query(`
        
        

        `)


}