import { Pool } from "pg";

import { config } from "../config/index.js";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

pool.on("error", (error) => {
  console.error("Unexpected Database Error:", error);
});

export const initDataBase = async () => {
  try {
  } catch (error) {
    console.error("Database Initialization Failed:", error);
    throw error;
  }
};
