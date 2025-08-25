import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import childDataRoutes from "../routes/childataRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow cross-origin requests
app.use(cors());

// Middleware
app.use(express.json());

// Health check route for Render
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({
    status: "ok",
    db: dbStatus,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/childata", childDataRoutes);

// DB connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
};

startServer();
