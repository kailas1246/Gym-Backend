import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import memberRoutes from "./routes/memberRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins (add more if needed)
const allowedOrigins = ['https://gym-frontend-hrn1.onrender.com'];

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Enable pre-flight OPTIONS request for all routes
app.options('*', cors());

app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
