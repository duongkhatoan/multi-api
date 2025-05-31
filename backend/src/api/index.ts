import express from "express";
import apiRouter from "@/api/routes";

import { prisma } from "@/database/prisma";

import { apiRateLimit } from "@/utils/rateLimiting";
import { MiddlewareFunction } from "@/utils/middleware";

const router = express.Router();

const assignContext: MiddlewareFunction = async (req, res, next) => {
  req.context = { prisma };
  next();
};

router.use(apiRateLimit);
router.use("/", assignContext, apiRouter);

export default router;
