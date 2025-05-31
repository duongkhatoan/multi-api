import { RequestType } from "@/types";
import { NextFunction, Response } from "express";

export type MiddlewareFunction = (req: RequestType, res: Response, next: NextFunction) => Promise<void>;

// // Rate limiter to prevent brute force attacks
// export const limiter = slowDown({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   delayAfter: 100, // allow 100 requests per window without delay
//   delayMs: (used, req) => {
//     const delayAfter = req.slowDown.limit;
//     return (used - delayAfter) * 500;
//   },
//   maxDelayMs: 20000, // max delay is 20 seconds
//   skip: (req) => {
//     // Skip rate limiting for trusted IPs or development environment
//     const { appEnv } = getConfigs();
//     return appEnv === "development";
//   },
// });
