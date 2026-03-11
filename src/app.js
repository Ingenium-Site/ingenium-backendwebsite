import express from "express";
import helmet from "helmet";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";
import requestServiceRoutes from "./routes/requestService.routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ingenium Backend is running very well!");
});

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/request-service", requestServiceRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An error occurred. Please try again later." });
});

export default app;
