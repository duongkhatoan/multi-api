import { Request, Response } from "express";
import { AggregatedDataParams, aggregationService } from "@/services/aggregationService";
import { RequestType } from "@/types";

export class AggregatedDataController {
  getAggregatedData = async (req: RequestType, res: Response) => {
    // Extract Prisma instance from request context
    const { prisma } = req.context;

    try {
      const filters = (req.query.filters as any) || {};

      // Create params with filters taking precedence, fallback to direct query params
      const params: AggregatedDataParams = {
        crypto: filters.crypto,
        city: filters.city,
        newsQuery: filters.newsQuery,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
        cryptoLimit: filters.cryptoLimit ? parseInt(filters.cryptoLimit) : undefined,
      };

      const data = await aggregationService.getAggregatedData(params, prisma);

      res.status(200).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Controller Error:", error);

      res.status(502).json({
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
        timestamp: new Date().toISOString(),
      });
    }
  };
}

const aggregatedDataController = new AggregatedDataController();
export default aggregatedDataController;
