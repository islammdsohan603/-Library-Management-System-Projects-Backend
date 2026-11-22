import { Pool } from "pg";

import { config } from "../config/index.js";
import { userTableQuery } from "./initDB.js";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

pool.on("error", (error) => {
  console.error("Unexpected Database Error:", error);
});

export const initDataBase = async () => {
  try {
    await pool.query(userTableQuery);
    console.log("DataBase Create Successfully");
  } catch (error) {
    console.error("Database Initialization Failed:", error);
    throw error;
  }
};
