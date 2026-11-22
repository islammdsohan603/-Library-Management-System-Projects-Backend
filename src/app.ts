import cors from "cors";
import express from "express";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Management API is Rnning",
  });
});

export default app;
