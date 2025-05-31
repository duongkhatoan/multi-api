import { Router } from "express";
import { aggregatedDataRoutes } from "./aggregatedDataRoutes";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  console.log("Health check endpoint hit");
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Multi-API Integration Backend",
  });
});

// Aggregated data routes
router.use("/aggregated-data", aggregatedDataRoutes);

export default router;
