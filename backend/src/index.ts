process.env.TZ = "UTC";

import { getConfigs } from "@/utils/configs";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import apiRoutes from "@/api";

const PORT = getConfigs().port;

async function start() {
  console.log(`======================`);
  console.log(`Starting Multi-API Integration Server...`);
  console.log(`======================`);

  const app = express();
  app.set("query parser", "extended");
  app.set("trust proxy", 1);
  app.use(cors<cors.CorsRequest>());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Add REST API routes

  app.use("/api", apiRoutes);

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
  });

  // Root endpoint
  app.get("/", (req, res) => {
    res.json({
      message: "Multi-API Integration Backend",
      version: "1.0.0",
      endpoints: ["GET /api/health", "GET /api/aggregated-data (supports price filtering)"],
    });
  });

  const httpServer = http.createServer(app);

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    httpServer.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
}

start();
