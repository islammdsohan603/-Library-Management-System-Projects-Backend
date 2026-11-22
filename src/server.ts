import dotenv from "dotenv";
import app from "./app.js";
import { config } from "./config/index.js";
import { initDataBase } from "./db/dataBase.js";

dotenv.config();

const server = async () => {
  try {
    await initDataBase();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

server();
