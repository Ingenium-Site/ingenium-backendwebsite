import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

dotenv.config();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An error occurred. Please try again later." });
});

export default app;