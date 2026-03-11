import express from "express";
import helmet from "helmet";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openapiPath = path.join(__dirname, "../docs/openapi.yaml");
const openapiDocument = YAML.parse(fs.readFileSync(openapiPath, "utf8"));

// API docs
app.get("/api/docs/openapi.yaml", (req, res) => {
  res.type("text/yaml").send(fs.readFileSync(openapiPath, "utf8"));
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/request-service", requestServiceRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An error occurred. Please try again later." });
});

export default app;
