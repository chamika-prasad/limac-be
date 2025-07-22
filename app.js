import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/sequelize.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import projectRoutes from "./routes/project.route.js";
import clientRoutes from "./routes/client.route.js";
import contactRoutes from "./routes/contact.route.js";
import homeRoutes from "./routes/home.route.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // or '*' for any origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you need to allow cookies
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/home", homeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

try {
  await sequelize.authenticate();
  console.log("✅ Sequelize connected to DB successfully");
} catch (error) {
  console.error(error);
  console.error("❌ Sequelize failed to connect:", error.message);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
