import dotenv from "dotenv";
import app from "./app.js";
import { initDataBase } from "./db/dataBase.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const server = async () => {
  try {
    await initDataBase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

server();
