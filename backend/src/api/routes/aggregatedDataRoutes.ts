import { Router } from "express";
import aggregatedDataController from "@/api/controllers/aggregatedDataController";

const router = Router();

router.get("/", aggregatedDataController.getAggregatedData);

export { router as aggregatedDataRoutes };
